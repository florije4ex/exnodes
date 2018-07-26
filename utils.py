# -*- coding: utf-8 -*-

import base64

authpair = "%s:%s" % ('bitcoin', 'bitcoin')
authpair = authpair.encode('utf8')
auth_data = "Basic " + base64.b64encode(authpair)
print(auth_data)
