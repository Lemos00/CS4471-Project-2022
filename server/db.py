import sqlite3
import typing

class Database:
    def __init__(self) -> None:
        self.connection = sqlite3.connect('database.db', check_same_thread=False)
        self.cursor = self.connection.cursor()
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS movie (
                movie_id INTEGER PRIMARY KEY,
                title TEXT,
                image_url TEXT,
                release_date DATE,
                age_rating TEXT
            )
        ''')
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS user (
                user_id INTEGER PRIMARY KEY,
                username TEXT,
                priv_key TEXT,
                hash_password TEXT,
                email TEXT,
                first_name TEXT,
                last_name TEXT,
                admin_status INTEGER
            )
        ''')
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS ticket (
                ticket_id INTEGER PRIMARY KEY,
                movie_id TEXT,
                user_id TEXT,
                theatre_id TEXT,
                seat_number TEXT,
                movie_date DATE,
                FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
                FOREIGN KEY (user_id) REFERENCES user(user_id)
            )
        ''')
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS receipt (
                receipt_id INTEGER PRIMARY KEY,
                ticket_id TEXT,
                user_id TEXT,
                total_tickets INTEGER,
                issue_date DATE,
                FOREIGN KEY (user_id) REFERENCES user(user_id)
            )
        ''')
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS theatre (
                theatre_id INTEGER PRIMARY KEY,
                users_id TEXT,
                current_seats INTEGER
            )
        ''')
        self.connection.commit()

    def add_movie(self, title: str, image_url: str, release_date: str, age_rating: str) -> bool:
        try:
            self.cursor.execute('''
                INSERT INTO movie (title, image_url, release_date, age_rating)
                VALUES (?, ?, ?, ?)
            ''', (title, image_url, release_date, age_rating))
            self.connection.commit()
            return True
        except sqlite3.Error:
            return False
    
    def add_user(self, username: str, priv_key: str, hash_password: str,
        email: str, first_name: str, last_name: str, admin_status: int) -> bool:
        try:
            self.cursor.execute('''
                INSERT INTO user (username, priv_key, hash_password, email, first_name, last_name, admin_status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (username, priv_key, hash_password, email, first_name, last_name, admin_status))
            self.connection.commit()
            return True
        except sqlite3.Error:
            return False
    
    def get_user_by_username(self, username: str) -> typing.Optional[dict]:
        self.cursor.execute('''
            SELECT * FROM user WHERE username = ?
        ''', (username,))
        data = self.cursor.fetchone()
        if data is None:
            return None
        return {
            'user_id': data[0],
            'username': data[1],
            'priv_key': data[2],
            'hash_password': data[3],
            'email': data[4],
            'first_name': data[5],
            'last_name': data[6],
            'admin_status': data[7]
        }
    
    def get_user_by_id(self, user_id: str) -> typing.Optional[dict]:
        self.cursor.execute('''
            SELECT * FROM user WHERE user_id = ?
        ''', (user_id,))
        data = self.cursor.fetchone()
        if data is None:
            return None
        return {
            'user_id': data[0],
            'username': data[1],
            'priv_key': data[2],
            'hash_password': data[3],
            'email': data[4],
            'first_name': data[5],
            'last_name': data[6],
            'admin_status': data[7]
        }
    
    def get_movie(self, movie_id: int) -> typing.Optional[dict]:
        self.cursor.execute('''
            SELECT * FROM movie WHERE movie_id = ?
        ''', (movie_id,))
        data = self.cursor.fetchone()
        if data is None:
            return None
        return {
            'movie_id': data[0],
            'title': data[1],
            'image_url': data[2],
            'release_date': data[3],
            'age_rating': data[4],
        }
    
    def get_all_movies(self) -> typing.List[dict]:
        self.cursor.execute('''
            SELECT * FROM movie
        ''')
        data = self.cursor.fetchall()
        if data is None:
            return []
        return [{
            'movie_id': row[0],
            'title': row[1],
            'image_url': row[2],
            'release_date': row[3],
            'age_rating': row[4],
        } for row in data]
    
    def add_receipt(self, ticket_id: str, user_id: str, total_tickets: int) -> bool:
        try:
            self.cursor.execute('''
                INSERT INTO receipt (ticket_id, user_id, total_tickets)
                VALUES (?, ?, ?)
            ''', (ticket_id, user_id, total_tickets))
            self.connection.commit()
            return True
        except sqlite3.Error:
            return False
    
    def get_booked_seats(self, theatre_id: str):
        self.cursor.execute('''
            SELECT * FROM theatre WHERE theatre_id = ?
        ''', (theatre_id,))
        data = self.cursor.fetchall()
        if data is None:
            return None
        
        users_id: str = data[1]

        return users_id.split(',')

    def get_ticket(self, ticket_id: int) -> typing.Optional[dict]:
        self.cursor.execute('''
            SELECT * FROM ticket WHERE ticket_id = ?
        ''', (ticket_id,))
        data = self.cursor.fetchone()
        if data is None:
            return None
        return {
            'ticket_id': data[0],
            'movie_id': data[1],
            'user_id': data[2],
            'seat_number': data[3],
            'movie_date': data[4],
        }
    
    def add_ticket(self, theatre_id: str, movie_id: str, user_id: str, seat_number: str, movie_date: str) -> bool:
        try:
            # check if seat is taken
            # for all users in users_id (theatre)
            #     for seat_number of user (ticket table)
            #        if seat_number == seat_number:

            users = self.get_booked_seats(theatre_id)
            for user in users:
                self.cursor.execute('''
                    SELECT * FROM ticket WHERE user_id = ?
                ''', (user,))
                tickets = self.cursor.fetchall()
                for ticket in tickets:
                    if ticket[3] == seat_number:
                        return False
            
            self.cursor.execute('''
                INSERT INTO ticket (movie_id, user_id, seat_number, movie_date)
                VALUES (?, ?, ?, ?)
            ''', (movie_id, user_id, seat_number, movie_date))

            # add seat to theatre
            users.append(user_id)
            users_id = ','.join(users)

            # fetch current_seats
            self.cursor.execute('''
                SELECT * FROM theatre WHERE theatre_id = ?
            ''', (theatre_id,))
            data = self.cursor.fetchone()
            current_seats = data[2]

            # update theatre
            self.cursor.execute('''
                UPDATE theatre SET users_id = ?, current_seats = ?
                WHERE theatre_id = ?
            ''', (users_id, current_seats - 1, theatre_id))

            self.connection.commit()
            return True
        except sqlite3.Error:
            return False

db = Database()
db.add_movie('The Matrix', 'https://www.imdb.com/title/tt0133093/mediaviewer/rm2050061312/', '1999-03-31', '15')
# print(db.get_movie(1))