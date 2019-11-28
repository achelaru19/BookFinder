import sys
import logging
import rds_config
import pymysql
import json

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
    
    userID = int(event['user_id'])
    userInfo = []
    
    with conn.cursor() as cur:
        
        cur.execute("select * from user where user_id={}".format(userID))
        if cur.rowcount != 1:
            return "Error: user_id not defined"
        for row in cur:
            print(cur.rowcount)
            userInfo.append(row)
        conn.commit()

    return json.dumps(userInfo, default=str)



