class Config(object):
	SECRET_KEY = "aaaaaaa"
	debug = False


class Production(Config):
	debug = True
	CSRF_ENABLED = False
	SQLALCHEMY_DATABASE_URI = "mysql://chuizonebeta:chuizone0000@127.0.0.1/chuizone"
	migration_directory = "migrations"

