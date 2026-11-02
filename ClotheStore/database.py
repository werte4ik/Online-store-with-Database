from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

SQL_DB_URL = "sqlite:///./database.db"

engine = create_engine(SQL_DB_URL,connect_args= {"check_same_thread": False})

session_local = sessionmaker(bind = engine, autoflush= False, autocommit = False)
Base = declarative_base()