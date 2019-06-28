# -*- coding: utf-8 -*-
import requests
import json
from datetime import datetime
import jwt

from RtForum.settings import Settings

current_time = datetime.utcnow()
web_site_url = "http://127.0.0.1:8888"
jwt_data = jwt.encode({
    "name": "袁承志",
    "id": 1,
    "exp": current_time
}, Settings["secret_key"]).decode("utf8")
headers = {"tsessionid": jwt_data}


def get_messages():
    res = requests.get("{}/messages/".format(web_site_url), headers=headers)
    print(res.status_code)
    print(json.loads(res.text))


if __name__ == '__main__':
    get_messages()
