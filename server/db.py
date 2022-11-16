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
                salt TEXT,
                hash_password TEXT,
                email TEXT,
                first_name TEXT,
                last_name TEXT
            )
        ''')
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS ticket (
                ticket_id INTEGER PRIMARY KEY,
                movie_id TEXT,
                user_id TEXT,
                seat_number TEXT,
                movie_date DATE,
                FOREIGN KEY (movie_id) REFERENCES movie(movie_id),
                FOREIGN KEY (user_id) REFERENCES user(user_id)
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
    
    def add_user(self, username: str, salt: str, hash_password: str,
        email: str, first_name: str, last_name: str) -> bool:
        try:
            self.cursor.execute('''
                INSERT INTO user (username, salt, hash_password, email, first_name, last_name)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (username, salt, hash_password, email, first_name, last_name))
            self.connection.commit()
            return True
        except sqlite3.Error:
            return False
    
    def get_user(self, user_id: int) -> typing.Optional[dict]:
        self.cursor.execute('''
            SELECT * FROM user WHERE user_id = ?
        ''', (user_id,))
        data = self.cursor.fetchone()
        if data is None:
            return None
        return {
            'user_id': data[0],
            'username': data[1],
            'salt': data[2],
            'hash_password': data[3],
            'email': data[4],
            'first_name': data[5],
            'last_name': data[6],
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

db = Database()
# db.add_movie('The Matrix', 'https://www.imdb.com/title/tt0133093/mediaviewer/rm2050061312/', '1999-03-31', '15')
print(db.get_movie(1))