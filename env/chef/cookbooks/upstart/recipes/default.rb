
template "/etc/init/ripple_gateway.conf" do
  source "ripple_gateway.conf.erb"
  action :create
end
