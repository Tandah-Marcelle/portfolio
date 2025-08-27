const ReadyToCollaborateSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="bg-blue-600 text-white p-3 rounded-lg  max-w-xl mx-auto">
            <h3 className="text-xl font-medium mb-4">Ready to Collaborate?</h3>
            <p className="text-xs text-blue-100 mb-6 text-base leading-relaxed">
              I'm always excited to work on meaningful projects that create positive impact. 
              Let's build something amazing together!
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center bg-white text-blue-600 px-4 py-1 rounded font-medium transition-all duration-300 hover:shadow-lg hover:bg-blue-50 text-base"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToCollaborateSection;