# Capistrano Deploy Instructions #

`gatewayd` can be deployed with capistrano. It has been tested with ubuntu 13.10.

### Install capistrano and dependencies
Assuming you have ruby and bundler installed, from the `gatewayd` root, run:
```bash
bundle install
```

### Set up deploy user
You need a user with sudo access to deploy. The script is configured to use the `ubuntu` user, you can change the :user setting in capistrano if you want a different user. You should copy your ssh key to this user's authorized_keys file.

### Add a service user
An unprivileged user should be created to securely run the server, you can use this cap task to add it:
```bash
bundle exec cap HOSTS=<ip or hostnames of target server> deploy:create_user
```

### Put the configuration in place
SSH to the server and create the configuration file.

Here's an example config that may be suitable for a staging environment where security is not important. NODE_ENV is omitted because capistrano sets it as an environment variable.
```bash
mkdir -p /var/apps/gatewayd/shared/config
cat <<END > /var/apps/gatewayd/shared/config/config.json
{
  "DATABASE_URL": "postgres://gatewayd_user:password@localhost:5432/gatewayd_db",
  "SSL": false
}
END
```
On each deploy, this configuration file will be copied to the release path.

### Deploy
Set the `HOSTS` environment variable to the target server and run:
```bash
bundle exec cap HOSTS=<ip or hostname of target server> deploy
```

You can deploy any branch by setting the `branch` environment variable
```bash
bundle exec cap HOSTS=<ip or hostname of target server> branch=mycoolfeature deploy
```

Capistrano also allows you to set (override) variables
```bash
bundle exec cap HOSTS=<ip or hostname of target server> --set repository='https://github.com/foo/gatewayd.git' deploy
```

### Notes
At this time, the "bin/gateway stop" task is not functioning, so a temporary workaround was added that uses pkill to stop any 'pm2' processes. This should be removed when the stop task is fixed.

