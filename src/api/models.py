from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from flask_bcrypt import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    firstname: Mapped[str] = mapped_column(
        String(120), nullable=False)
    lastname: Mapped[str] = mapped_column(
        String(120), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(120), nullable= False )

    def generate(self, password):
        self.password_hash = generate_password_hash(password).decode("utf-8")
    
    def check(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

