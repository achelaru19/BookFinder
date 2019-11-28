import sys
import logging
import rds_config
import pymysql
import json
import bson 

#rds settings
rds_host  = "book-finder.cy7f3clldavr.eu-central-1.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
def handler(event, context):
    
    isbn = event['isbn']
    title = event['title']
    author = event['author']
    editor = event['editor']


    query = ("select * "
            "from book "
            "where isbn='{}' and sold=false "
            "union "
            "select * "
            "from book "
            "where title='{}' and sold=false  "
            "union "
            "select * "
            "from book "
            "where author='{}' and sold=false "
            "union "
            "select * "
            "from book "
            "where editor='{}' and sold=false ").format(isbn, title, author, editor)
    books = []

    with conn.cursor() as cur:
        cur.execute(query)
        for row in cur:
            books.append(row)
        conn.commit()

    return json.dumps(books, default=str)



