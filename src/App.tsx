import ContentLayout from './components/ui/Layout/ContentLayout.';
import { ImagesList } from './components/features/gallery';
import { useGetImages } from './hooks/useGetImages';

function App() {
  const { items, isLoading, error, hasMore, onLoadMore, totalImages } =
    useGetImages();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Images ({totalImages})</h1>
      <ContentLayout>
        <ImagesList
          items={items}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          error={error}
        />
      </ContentLayout>
    </div>
  );
}

export default App;
