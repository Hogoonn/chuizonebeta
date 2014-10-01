class Config(object):
	SECRET_KEY = "aaaaaaa"
	debug = False


class Production(Config):
	debug = True
	CSRF_ENABLED = False
	ADMIN = "chuizone.com@gmail.com"
	SQLALCHEMY_DATABASE_URI = "mysql+gaerdbms:///chuizone?instance=chuizonebeta:chuizonebeta"
	migration_directory = "migrations"