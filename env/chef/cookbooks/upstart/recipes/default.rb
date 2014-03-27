
template "/etc/init/ripple_gateway.conf" do
  source "ripple_gateway.conf.erb"
  action :create
end

template "/etc/init/ripple_gateway-webapp.conf" do
  source "ripple_gateway-webapp.conf.erb"
  action :create
end

template "/etc/init/ripple_gateway-webapp-1.conf" do
  source "ripple_gateway-webapp-1.conf.erb"
  action :create
end

template "/etc/init/ripple_gateway-incoming_ripple_payments.conf" do
  source "ripple_gateway-incoming_ripple_payments.conf.erb"
  action :create
end

template "/etc/init/ripple_gateway-incoming_ripple_payments-1.conf" do
  source "ripple_gateway-incoming_ripple_payments-1.conf.erb"
  action :create
end

template "/etc/init/ripple_gateway-outgoing_ripple_payments.conf" do
  source "ripple_gateway-outgoing_ripple_payments.conf.erb"
  action :create
end

template "/etc/init/ripple_gateway-outgoing_ripple_payments-1.conf" do
  source "ripple_gateway-outgoing_ripple_payments-1.conf.erb"
  action :create
end
