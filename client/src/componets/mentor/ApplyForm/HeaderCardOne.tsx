const HeaderCard: React.FC = () => {
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="w-4/5 md:w-3/5 bg-gray-800 px-4 py-4 rounded-md">
        <h1 className="font-bold text-color-five">Lovely to see you!</h1>
        <p className="text-white">
          Filling out the form only takes a couple minutes. We'd love to learn
          more about your background and the ins-and-outs of why you'd like to
          become a mentor. Keep things personal and talk directly to us and your
          mentees.
        </p>
      </div>
    </div>
  );
};

export default HeaderCard;
