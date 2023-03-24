require 'sinatra'

class MyApp < Sinatra::Base # Defines a subclass for Sinatra::Base class
  set :port, 3001
  set :public_folder, 'public'
  
  get '/' do
    send_file 'public/index.html'
  end

end

# If the Ruby file is executed it directly starts the Sinatra server on the previously defined port
if __FILE__ == $0
    MyApp.run!
  end
