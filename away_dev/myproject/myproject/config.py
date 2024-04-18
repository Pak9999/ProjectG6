import os
from dotenv import load_dotenv

# Load environment variables from .env if it exists, otherwise use .env.example
dotenv_files = ['.env'] if os.path.exists('.env') else ['.env.example']
load_dotenv(*dotenv_files)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'default_db_name'),
        'USER': os.getenv('DB_USER', 'default_user'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'default_password'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}