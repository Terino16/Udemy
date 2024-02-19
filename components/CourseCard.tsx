import { TCourse } from "@/app/types";

 const CourseCard = ({ 
    id,
    author,
            authorEmail,
            date,
            imageUrl,
            catName,
            name,
            content}:TCourse
 ) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img className="w-full h-48 object-cover object-center" src={imageUrl} alt={name} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="mt-2 text-gray-600">{content}</p>
          <div className="flex items-center mt-4">
            <div>
              <p className="text-gray-600">{date}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CourseCard;