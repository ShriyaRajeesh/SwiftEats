import CategoryCard from './CategoryCard';

const PopularCategories = () => {
  const categories = [
    {
      name: 'Pizza',
      imageUrl: 'https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=',
      link: '/category/pizza'
    },
    {
      name: 'Burger',
      imageUrl: 'https://media.istockphoto.com/id/1206323282/photo/juicy-hamburger-on-white-background.jpg?s=612x612&w=0&k=20&c=K0DxyiChLwewXcCy8aLjjOqkc8QXPgQMAW-vwRCzqG4=',
      link: '/category/burger'
    },
    {
      name: 'Chinese',
      imageUrl: 'https://media.istockphoto.com/id/1175634961/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=NuDYCZAQgRu3CP3i5iHQEssjLWDiRgYqMwMflLAGqTE=',
      link: '/category/chinese'
    },
    {
      name: 'South Indian',
      imageUrl: 'https://media.istockphoto.com/id/1024585168/photo/masala-dosa-south-indian-dish.jpg?s=612x612&w=0&k=20&c=plvPfQrpbgEF0pQmrHlRiCC6hUeQkB9sYLHKo1gj1HQ=',
      link: '/category/south-indian'
    },
    {
      name: 'Biryani',
      imageUrl: 'https://media.istockphoto.com/id/1345624336/photo/chicken-biryani-with-yogurt-dip-popular-indian-pakistani-non-vegetarian-food.jpg?s=612x612&w=0&k=20&c=XZHbXD0mQoXLivN15SjOd1qdFQjcpZm_aTLbdVuYXJo=',
      link: '/category/biryani'
    },
    {
      name: 'Desserts',
      imageUrl: 'https://media.istockphoto.com/id/1269987457/photo/homemade-chocolate-brownies-cake-sliced-on-a-white-plate.jpg?s=612x612&w=0&k=20&c=dVnl_JJ6U8Qk_TijKMbPBbj2WpzKf3IcAYUYI7DqWLM=',
      link: '/category/desserts'
    },
    {
      name: 'Healthy',
      imageUrl: 'https://media.istockphoto.com/id/1165399909/photo/delicious-meal-in-a-bowl-on-a-kitchen-counter.jpg?s=612x612&w=0&k=20&c=0Z9-1OWYpTNSpFuMkR7bqKJJ83WmIf2piz-F12Bfxg4=',
      link: '/category/healthy'
    },
    {
      name: 'Beverages',
      imageUrl: 'https://media.istockphoto.com/id/1225783065/photo/strawberry-smoothie-in-a-glass-jar-with-a-straw.jpg?s=612x612&w=0&k=20&c=WcS98Vh6LNIGDJ5z_jVTmO4VhJXzvpEGz_VjqJQGMCE=',
      link: '/category/beverages'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-3">Popular Food Categories</h2>
        <p className="text-gray-600 mb-8">Explore restaurants by your favorite food category</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-10 gap-x-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              imageUrl={category.imageUrl}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
