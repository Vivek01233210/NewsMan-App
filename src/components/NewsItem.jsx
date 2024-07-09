import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MdRunningWithErrors } from "react-icons/md";

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, source, date } = props;
    const [maxLength, setMaxLength] = useState(getMaxLength(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setMaxLength(getMaxLength(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function getMaxLength(width) {
        if (width < 640) return 150; // TailwindCSS sm breakpoint
        if (width < 768) return 80; // md
        if (width < 1024) return 150; // lg
        return 200; // xl and above
    }

    function truncateString(str, num) {
        return str?.length > num ? str.slice(0, num) + "..." : str;
    }
    return (
        <div className="m-3 border-[1px] border-gray-300 max-w-[22rem] rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg duration-300">
            <img className="h-36 w-full lg:h-40 xl:h-48 object-cover " src={(imageUrl !== null) ? imageUrl : <MdRunningWithErrors />} alt="news-pic" />
            <div className="px-2 py-2">
                <h5 className="text-lg font-semibold text-blue-500 leading-6"><a className='hover:underline' href={newsUrl} target="_blank">{title}...</a></h5>
                <p className="text-sm" >Source: <span>{source}</span></p>
                <p className="text-base" >{truncateString(description || title, maxLength)}</p>
                <p className="text-sm items-end"><small>Published on: {new Date(date).toUTCString()}</small></p>
            </div>
        </div>
    )
}

NewsItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    newsUrl: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
};

export default NewsItem