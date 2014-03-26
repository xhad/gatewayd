package "build-essential"
package "zlib1g-dev"
package "libssl-dev"
package "libreadline6-dev"
package "libyaml-dev"

bash "install_ruby_2" do
  user "root"
  cwd "/tmp"
  code <<-EOH
  wget http://cache.ruby-lang.org/pub/ruby/2.0/ruby-2.0.0-p353.tar.gz
  tar -xvzf ruby-2.0.0-p353.tar.gz
  cd ruby-2.0.0-p353/
  ./configure --prefix=/usr/local
  make
  sudo make install
  EOH
end

