# config valid only for Capistrano 3.1
lock '3.1.0'

set :application, 'ripple_gateway'
set :repo_url, 'https://github.com/ripple/ripple-gateway.git'
set :branch, "staging"

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

role :app, "ubuntu@ec2-54-242-187-121.compute-1.amazonaws.com"

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
end

after "deploy:updated", "deploy:cleanup"
after "deploy:cleanup", "deploy:copy_config"
after "deploy:finished", "deploy:npm_install"

