import { Controls } from '@features/artwork-config'
import { PricingSummary } from '@features/cart'
import { ImageUploader } from '@features/image-uploader'
import { Header } from '@shared/ui/header'
import { MobileTabSwitcher } from '@shared/ui/mobile-tab-switcher'
import { TabContent } from '@shared/ui/tab-content'
import { Wall } from '@widgets/wall-preview'
import { MOBILE_TABS } from '../lib/constants'
import { useHomePage } from '../model/useHomePage'

export const HomePage = () => {
  const {
    artworks,
    activeId,
    activeArtwork,
    setActiveId,
    handleImagesSelected,
    handlePositionChange,
    handleConfigChange,
    handleAddToCart,
    handleDeleteArtwork,
    handleReset,
    mobileTab,
    handleTabChange,
  } = useHomePage()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_23.75rem] gap-4 sm:gap-6 lg:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <ImageUploader
              onImagesSelected={handleImagesSelected}
              currentCount={artworks.length}
              maxCount={3}
            />
            <Wall
              artworks={artworks}
              activeId={activeId}
              onSelect={setActiveId}
              onPositionChange={handlePositionChange}
            />
          </div>

          <aside className="space-y-4 sm:space-y-6 lg:sticky lg:top-24 lg:self-start">
            <MobileTabSwitcher
              tabs={MOBILE_TABS}
              activeTab={mobileTab}
              onTabChange={handleTabChange}
            />

            <TabContent isActive={mobileTab === 'settings'}>
              <Controls
                artwork={activeArtwork}
                onConfigChange={handleConfigChange}
              />
            </TabContent>

            <TabContent isActive={mobileTab === 'pricing'}>
              <PricingSummary
                artworks={artworks}
                onAddToCart={handleAddToCart}
                onDeleteArtwork={handleDeleteArtwork}
                onReset={handleReset}
              />
            </TabContent>
          </aside>
        </div>
      </main>
    </div>
  )
}
