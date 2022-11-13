import json
import typing

class MovieDatabase:
    def __init__(self):
        self.db: dict = {}
        self.load()
    
    def load(self):
        """Load the database from the JSON file"""

        with open('database/movies.json') as f:
            self.db = json.load(f)
    
    def save(self):
        """Save the database to the JSON file and reload it"""
        with open('movies.json', 'w') as f:
            json.dump(self.db, f)
        
        self.load()
    
    def get_movie(self, movie_id: str) -> typing.Optional[dict]:
        """Get a movie from the database"""
        status = True

        if movie_id not in self.db:
            return None
        
        return {
            'status': status,
            'movie_id': movie_id,
            'title': self.db[movie_id]['title'],
        }
    
    def add_movie(self, movie_id: str, title: str) -> bool:
        """Add a movie to the database"""

        if movie_id in self.db:
            return False

        self.db[movie_id] = {
            'title': title,
        }

        # Save the new movie to the database
        self.save()

        return True
