# -*- coding: utf-8 -*-
from datetime import datetime, date


def json_serializer(obj):
    """
    带日期json序列化
    """
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError("Type {}s not serializable".format(type(obj)))
