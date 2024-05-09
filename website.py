import webapp2
import os
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),extensions=['jinja2.ext.autoescape'],autoescape=True)


def handle_404(request, response, exception):
	response.write('Oh no! Wrong link.')
	response.set_status(404)

class MainPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())
        self.response.write(template)


app = webapp2.WSGIApplication([('/',MainPage),], debug= True)

app.error_handlers[404] = handle_404