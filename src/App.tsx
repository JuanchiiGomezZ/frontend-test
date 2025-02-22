import ContentLayout from './components/ui/Layout/ContentLayout.';
import { ImagesList } from './components/features/gallery';
import { useGetImages } from './hooks/useGetImages';
import { Header } from './components/common/Header';

function App() {
  const { items, isLoading, error, hasMore, onLoadMore } = useGetImages();

  return (
    <div>
      <Header />
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
