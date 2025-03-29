const AppDownload = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">For better experience, download the Swiggy app now</h2>
            <p className="text-gray-600 mb-6">
              Get access to exclusive offers and stay updated with your order status on the go with the Swiggy app.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://itunes.apple.com/in/app/id989540920"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://ext.same-assets.com/2913897597/3124492574.png"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=in.swiggy.android"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://ext.same-assets.com/2913897597/2021242949.png"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="w-64 h-96 bg-swiggy-light rounded-3xl relative overflow-hidden shadow-xl">
              <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-10 bg-swiggy-orange flex items-center justify-center">
                  <div className="h-4 w-20 bg-white/20 rounded-full"></div>
                </div>
                <div className="pt-12 px-4">
                  <div className="h-24 bg-swiggy-light rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-full mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-full mb-4 w-1/2"></div>

                  <div className="h-24 bg-swiggy-light rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-full mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded-full mb-4 w-2/3"></div>

                  <div className="h-10 bg-swiggy-orange rounded-lg mb-2 w-full flex items-center justify-center">
                    <div className="h-3 w-20 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
