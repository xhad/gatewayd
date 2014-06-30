require 'capistrano/node-deploy'
require 'capistrano/uptodate'

set :application, 'gatewayd'
set :scm, 'git'
set :repository, 'https://github.com/ripple/gatewayd.git'
set :branch, ENV['branch'] ? ENV['branch'] : 'develop'
set :deploy_to, "/var/apps/#{application}"
set :user, 'ubuntu' # deploy user
set :node_user, "#{application}" # run user
set :node_binary, '/usr/bin/node'
set :node_env, ENV['NODE_ENV'] ? ENV['NODE_ENV'] : 'staging'
set :app_command, 'bin/gateway'
#set :app_environment, '' # environment variables

set :upstart_file_contents, <<EOD
#!upstart
description "#{application} node app"
author      "capistrano"

start on runlevel [2345]
stop on shutdown

respawn
respawn limit 99 5
kill timeout #{kill_timeout}

script
    cd #{current_path} && exec sudo -u #{node_user} NODE_ENV=#{node_env} #{app_environment} #{node_binary} #{current_path}/#{app_command} start 2>> #{stderr_log_path} 1>> #{stdout_log_path}
end script

pre-stop script
    cd #{current_path} && exec sudo -u #{node_user} NODE_ENV=#{node_env} #{app_environment} #{node_binary} #{current_path}/#{app_command} stop 2>> #{stderr_log_path} 1>> #{stdout_log_path}
end script

post-stop script
    # not nice workaround for './bin/gateway stop' not working
    sudo -u #{node_user} pkill pm2
end script
EOD

namespace :deploy do
  desc "Copy settings file to release dir"
  task :copy_config_to_release_path do
    run "if [ -f #{shared_path}/config/config.json ]; then cp -a #{shared_path}/config/config.json #{release_path}/config/; fi"
  end

  desc 'Create service user'
  task :create_user do
    run "sudo -u root useradd -U -m -r -s /dev/null #{application}"
  end
end

namespace :node do
  desc "Run migrations"
  task :migrate do
    # grunt migrations plugin seems to be ignoring the path to migrations dir, so symlink it to default location
    run "ln -s #{release_path}/lib/data/migrations #{release_path}/migrations"
    run "cd #{release_path} && grunt migrate:up --env=#{node_env}"
  end
end

after 'node:install_packages', 'deploy:copy_config_to_release_path'
