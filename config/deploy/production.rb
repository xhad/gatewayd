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

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      # execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end
