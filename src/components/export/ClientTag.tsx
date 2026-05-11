'use client';

// Pequeno client island: renderiza a "tag" do card de cafe no locale ativo.
// Necessario pq o objeto {pt,en,es} nao mora no dictionary global e a
// resolucao precisa do LocaleContext (so disponivel client-side).

import { useContext } from 'react';
import { LocaleContext } from '@/lib/i18n/LocaleProvider';

type Tag = { pt: string; en: string; es: string };

export default function ClientTag({ tag }: { tag: Tag }) {
  const { locale } = useContext(LocaleContext);
  return <span className="tag">{tag[locale]}</span>;
}
