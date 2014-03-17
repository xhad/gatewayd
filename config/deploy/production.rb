# config valid only for Capistrano 3.1
lock '3.1.0'

set :application, 'ripple_gateway'
set :repo_url, 'https://github.com/ripple/ripple-gateway.git'
set :branch, "master"

set :deploy_to, '/var/www/ripple_gateway'
set :scm, :git
set :format, :pretty
set :log_level, :debug
set :copy_strategy, :checkout
set :use_sudo, true
set :copy_compression, :bz2
set :keep_releases, 5
set :document_root, "/var/www/ripple_gateway"

set :ssh_options, { 
  :forward_agent => true, 
  :auth_methods => ["publickey"],
  :keys => ["~/.ssh/amazon-web-service.pem"]  
}

set :user, 'ubuntu'

role :app, "ubuntu@ec2-54-198-23-155.compute-1.amazonaws.com"

namespace :deploy do
  task :npm_install, [:roles] => :app do
    on roles(:app) do
      execute "cd #{release_path} && npm install"
    end
  end

  task :copy_config do
    on roles(:app) do
      execute "ln -s #{shared_path}/config.json #{release_path}/config/config.json"
    end
  end

  task :start, :roles => :app do
    run "sudo restart #{application} || sudo start #{application}"
  end
 
  task :stop, :roles => :app do
    run "sudo stop #{application}"
  end
 
  task :restart, :roles => :app do
    start
  end

end

after "deploy:updated", "deploy:cleanup"
after "deploy:cleanup", "deploy:copy_config"
after "deploy:finished", "deploy:npm_install"
after "deploy:npm_install", "deploy:restart"

