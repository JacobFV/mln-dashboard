import { Group } from "@mantine/core";
import { useEffect, useState } from "react";

export type GalleryInputs<T> = {
  cardRenderers: Map<string, (data: T) => React.Component>,
  defaultCardRenderer: (data: T) => React.Component,
  typeFn: (data: T) => string,
  cardData: T[]
}

export default function Gallery<T>(inputs: GalleryInputs<T>) {
  let { cardRenderers, defaultCardRenderer, typeFn, cardData } = inputs;
  const [cards, setCards] = useState<React.Component[]>([]);

  useEffect(() => {
    setCards(cardData.map(data => {
      const renderer = cardRenderers.get(typeFn(data)) || defaultCardRenderer;
      return renderer(data);
    }));
  }, [cardData]);

  return (
    <Group className="gallery">
      {cards}
    </Group>
  );
}