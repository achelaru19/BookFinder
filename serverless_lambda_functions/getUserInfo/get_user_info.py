import sys
import logging
import rds_config
import pymysql
import datetime

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
    


    item_count = 0

    with conn.cursor() as cur:
        
        cur.execute("select * from user")
        conn.commit()

    return "Added %d book from RDS MySQL table" %(item_count)


