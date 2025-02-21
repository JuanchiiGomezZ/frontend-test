import { ImagesQueryResponse } from '../../../types/api';
import { ImageCard } from './ImageCard';

const ImagesList = ({ data }: { data: ImagesQueryResponse }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
      {data?.images.edges.map(({ node }) => (
        <ImageCard key={node.id} {...node} />
      ))}
    </div>
  );
};

export default ImagesList;
