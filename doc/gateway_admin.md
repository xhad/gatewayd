### How to run gatewayd-admin

1. Set up gatewayd on [Ubuntu](https://github.com/ripple/gatewayd/blob/master/doc/install.md) or [Mac](https://github.com/ripple/gatewayd/blob/master/doc/installmac.md)

2. Start gateawayd:
```
bin/gateway start
```

3. Make a new gatewayd API key:
```
bin/gateway get_key
```

4. Reload the server:
```
pm2 reload server
```

5. Go to https://localhost:5000 (you may have a security warning, so click on advanced and proceed anyway)

6. Login with:
```
username: admin@example.com
password: <gatewayd API key>
```

### Using gatewayd-admin

Click the links along the navbar to navigate to different gatewayd databases where you have CRUD (create, read, update, delete) capability for all tables. This gives you easy access to check and modify all information for your gateway.

When creating/updating database entries, fields in green are required.

### Useful commands:

* Start gateway
```
bin/gateway start
```

* Stop gateway
```
bin/gateway stop
```

* Check running processes
```
pm2 list
```

* Check logs
```
pm2 logs server
```

* Reload all process
```
pm2 reload all
```

* Kill all processes
```
pm2 kill
```

### Developing gatewayd admin

Fork the [gatewayd-admin GitHub repository](https://github.com/gatewayd/gatewayd-admin) and clone your fork.

Include this line in gatewayd's config/config.json:

```
{
  ...
  "WEBAPP_PATH":"<absolute path (no '~' allowed) to folder containing js folder>"
}
```
