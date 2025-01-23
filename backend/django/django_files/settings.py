import sentry_sdk

import os
from pathlib import Path

# Base directory of your project (where manage.py is located)
BASE_DIR = Path(__file__).resolve().parent.parent

# Secret key (make sure to keep this secret in production)
SECRET_KEY = 'your-secret-key-here'

# Set to False in production
DEBUG = True

# Allowed hosts (adjust for production)
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# endpointy ktore beda pomijane przez middleware - 
SKIP_AUTHENTICATION_PATHS = [
    '/api/login/',
    '/api/register/',
]

SPRING_API_URL = "http://spring:8080/api/v1/users"
SPRING_API_VERIFY_URL = SPRING_API_URL + "/check-token"
SPRING_API_LOGIN_URL = SPRING_API_URL + "/login"
SPRING_API_REGISTER_URL = SPRING_API_URL + "/register"

# parametry dla jwt - kodowanie
JWT_SECRET_KEY = "tajny_kod_dzilimy_go_z_api_Spring" #uzywany do symulacji logowania
JWT_ALGORITHM= "HS256"

# Installed apps (add your custom apps here)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'api',
    'corsheaders'
    # Add your apps here
]

# Middleware configuration
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'api.middleware.jwt_authentication.JWTAuthenticationMiddleware'
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
]

CORS_ALLOW_CREDENTIALS = True
CORS_EXPOSE_HEADERS = ['Authorization']

# Root URL configuration
ROOT_URLCONF = 'django_files.urls'  # Change 'myproject' to your project name

# Templates configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],  # Set templates directory
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# # WSGI application
# WSGI_APPLICATION = 'djnago_files.wsgi.application'  # Change 'myproject' to your project name

# Database configuration (using SQLite by default)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

sentry_sdk.init(
    dsn="https://962453e19ffa903e041fb8642f558e72@o4508576559333376.ingest.de.sentry.io/4508576562413648",
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for tracing.
    traces_sample_rate=1.0,
    _experiments={
        # Set continuous_profiling_auto_start to True
        # to automatically start the profiler on when
        # possible.
        "continuous_profiling_auto_start": True,
    },
)