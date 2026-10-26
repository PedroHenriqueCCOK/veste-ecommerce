import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search, ShoppingBag, Menu, X, ArrowRight, Plus, Minus, Check,
  SlidersHorizontal, Mic, Volume2, Pause, Play, Square, Accessibility,
  ArrowLeft, Trash2, CheckCircle2, Info, RotateCcw,
} from 'lucide-react';
import './styles.css';

/* ─── dados ─────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {id:1,name:'Camiseta essencial',category:'Camisetas',price:89.9,short:'Algodão macio, caimento reto e simplicidade atemporal.',long:'Camiseta de manga curta em preto profundo, com modelagem regular e caimento reto. A gola redonda tem acabamento canelado discreto. O tecido tem aparência lisa e toque visual uniforme, sem estampa ou elementos decorativos. Uma peça versátil para usar sozinha ou em sobreposições.',alt:'Pessoa usando camiseta preta lisa de manga curta, gola redonda e modelagem reta, fotografada contra fundo neutro.',material:'100% algodão',care:'Lavar com cores semelhantes. Secar à sombra. Passar em temperatura média.',colors:[{name:'Preto',hex:'#171717'},{name:'Branco',hex:'#ffffff'},{name:'Verde-oliva',hex:'#69765a'}],sizes:['PP','P','M','G','GG'],stock:true,adapted:false,measurements:[['PP','48','66'],['P','50','68'],['M','53','71'],['G','56','74'],['GG','60','77']],image:'photo-1521572163474-6864f9cf17ab'},
  {id:2,name:'Camiseta verde-oliva',category:'Camisetas',price:99.9,short:'Modelagem regular em tom natural e fácil de combinar.',long:'Camiseta verde-oliva de manga curta, com gola redonda e modelagem regular. O corte acompanha o corpo sem ficar justo. A superfície é lisa e a peça não possui estampa. A tonalidade pode variar ligeiramente conforme a tela e a iluminação.',alt:'Camiseta verde-oliva de manga curta e gola redonda apresentada em fundo claro.',material:'100% algodão',care:'Lavar do avesso com cores semelhantes. Não usar alvejante.',colors:[{name:'Verde-oliva',hex:'#69765a'},{name:'Preto',hex:'#171717'}],sizes:['P','M','G','GG'],stock:true,adapted:false,measurements:[['P','50','68'],['M','53','71'],['G','56','74'],['GG','60','77']],image:'photo-1503342217505-b0a15ec3261c'},
  {id:3,name:'Camisa de linho',category:'Camisas',price:189.9,short:'Manga longa, textura natural e visual descontraído.',long:'Camisa de manga longa com colarinho clássico, fechamento frontal por botões e barra levemente arredondada. O tecido apresenta textura natural sutil, característica do linho. A modelagem é confortável e permite usar a peça aberta sobre uma camiseta.',alt:'Pessoa vestindo camisa clara de manga longa, com colarinho e caimento solto.',material:'55% linho e 45% viscose',care:'Lavar em ciclo delicado. Secar em cabide à sombra.',colors:[{name:'Areia',hex:'#d5c4a6'},{name:'Branco',hex:'#ffffff'},{name:'Azul-marinho',hex:'#233449'}],sizes:['P','M','G','GG'],stock:true,adapted:false,measurements:[['P','52','70'],['M','55','73'],['G','58','76'],['GG','62','79']],image:'photo-1598033129183-c4f50c736f10'},
  {id:4,name:'Jeans corte reto',category:'Calças',price:169.9,short:'Jeans azul de perna reta e cintura média.',long:'Calça jeans azul de cintura média, com cós estruturado, passantes para cinto, fechamento frontal por botão e zíper e cinco bolsos. A perna tem corte reto do quadril à barra. O jeans apresenta lavagem azul média com leves variações de tonalidade.',alt:'Calça jeans azul de corte reto, cintura média, cinco bolsos e lavagem azul média.',material:'98% algodão e 2% elastano',care:'Lavar do avesso. Evitar lavagem frequente para preservar a cor.',colors:[{name:'Azul médio',hex:'#42617a'},{name:'Preto',hex:'#252525'}],sizes:['36','38','40','42','44','46'],stock:true,adapted:false,measurements:[['36','76','101'],['38','80','102'],['40','84','103'],['42','88','104'],['44','92','105'],['46','96','106']],image:'photo-1542272604-787c3835535d'},
  {id:5,name:'Calça fácil vestir',category:'Calças',price:219.9,short:'Abertura lateral e fechamento simplificado para vestir com mais autonomia.',long:'Calça de corte reto e cintura média, desenvolvida com abertura lateral e fechamento simplificado para facilitar o vestir. A peça tem bolsos frontais e tecido de superfície lisa. O fechamento adaptado está localizado nas laterais e substitui parte do manuseio convencional de botões e zíper.',alt:'Calça preta de corte reto e cintura média, exibida de frente em fundo neutro.',material:'92% poliéster e 8% elastano',care:'Lavar em ciclo delicado. Fechar os fechos antes da lavagem.',colors:[{name:'Preto',hex:'#171717'},{name:'Azul-marinho',hex:'#233449'}],sizes:['P','M','G','GG'],stock:true,adapted:true,features:['Abertura lateral','Fechamento simplificado'],measurements:[['P','78','99'],['M','84','101'],['G','90','103'],['GG','98','105']],image:'photo-1506629905607-d9f6b7e8b6e8'},
  {id:6,name:'Jaqueta fecho magnético',category:'Jaquetas',price:289.9,short:'Jaqueta leve com fechamento magnético frontal.',long:'Jaqueta de comprimento até o quadril, gola baixa, mangas longas e dois bolsos frontais. O fechamento frontal utiliza encaixes magnéticos sob a vista do tecido, reduzindo a necessidade de alinhar botões pequenos. A modelagem é reta e permite usar uma camada por baixo.',alt:'Jaqueta escura de comprimento até o quadril, mangas longas, gola baixa e bolsos frontais.',material:'100% poliéster',care:'Limpar conforme etiqueta interna. Não passar diretamente sobre os fechos magnéticos.',colors:[{name:'Preto',hex:'#171717'},{name:'Verde profundo',hex:'#174c3c'}],sizes:['P','M','G','GG'],stock:true,adapted:true,features:['Fechamento magnético frontal'],measurements:[['P','54','64'],['M','57','67'],['G','60','70'],['GG','64','73']],image:'photo-1551028719-00167b16eac5'},
  {id:7,name:'Vestido movimento',category:'Vestidos',price:199.9,short:'Vestido midi de tecido leve, com cintura marcada e mangas curtas.',long:'Vestido midi em tom terracota, com mangas curtas, decote redondo e cintura marcada por recorte. A saia tem caimento fluido e comprimento abaixo dos joelhos. Não possui estampa. O fechamento é feito por zíper lateral discreto.',alt:'Vestido midi terracota de mangas curtas, cintura marcada e saia fluida.',material:'100% viscose',care:'Lavar à mão ou em ciclo delicado. Secar à sombra.',colors:[{name:'Terracota',hex:'#a65f46'},{name:'Preto',hex:'#171717'}],sizes:['PP','P','M','G','GG'],stock:true,adapted:false,measurements:[['PP','84','115'],['P','88','117'],['M','94','119'],['G','100','121'],['GG','108','123']],image:'photo-1496747611176-843222e1e57c'},
  {id:8,name:'Camisa com etiqueta tátil',category:'Camisas',price:159.9,short:'Camisa de toque macio com etiqueta tátil para identificar a peça.',long:'Camisa de manga curta com colarinho clássico, fechamento frontal por botões e modelagem regular. Uma pequena etiqueta tátil interna identifica a peça por meio de marcações em relevo. A etiqueta foi posicionada para ser encontrada pelo toque sem alterar a aparência externa da camisa.',alt:'Camisa azul-clara de manga curta, colarinho clássico e fechamento frontal por botões.',material:'100% algodão',care:'Lavar do avesso. Evitar passar diretamente sobre a etiqueta tátil.',colors:[{name:'Azul-claro',hex:'#b5cbd5'},{name:'Branco',hex:'#ffffff'}],sizes:['P','M','G','GG'],stock:true,adapted:true,features:['Etiqueta tátil de identificação'],measurements:[['P','52','70'],['M','55','73'],['G','58','76'],['GG','62','79']],image:'photo-1596755389378-c31d21fd1273'},
];

const money = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const imageUrl = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

/* ─── hook: trap de foco num elemento container ─────────────────────────────── */
function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function handleKey(e) {
      if (e.key !== 'Tab') return;
      const items = Array.from(el.querySelectorAll(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    el.addEventListener('keydown', handleKey);
    return () => el.removeEventListener('keydown', handleKey);
  }, [active, ref]);
}

/* ─── componente App ────────────────────────────────────────────────────────── */
function App() {
  /* estado de navegação / busca */
  const [page, setPage]           = useState('home');
  const [category, setCategory]   = useState('Todas');
  const [query, setQuery]         = useState('');
  const [sort, setSort]           = useState('relevance');

  /* filtros */
  const [filtersOpen, setFiltersOpen]   = useState(false);
  const [filterCat, setFilterCat]       = useState('Todas');
  const [filterSize, setFilterSize]     = useState('');
  const [filterColor, setFilterColor]   = useState('');
  const [adaptedOnly, setAdaptedOnly]   = useState(false);
  const [maxPrice, setMaxPrice]         = useState(350);

  /* produto selecionado */
  const [selected, setSelected]         = useState(PRODUCTS[0]);
  const [variantColor, setVariantColor] = useState('Preto');
  const [variantSize, setVariantSize]   = useState('');
  const [qty, setQty]                   = useState(1);

  /* carrinho */
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('veste-cart') || '[]'); } catch { return []; }
  });

  /* UI */
  const [notice, setNotice]       = useState('');
  const [drawer, setDrawer]       = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [textScale, setTextScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* voz */
  const [speechState, setSpeechState]   = useState('idle');
  const [voiceStatus, setVoiceStatus]   = useState('');
  const [voiceText, setVoiceText]       = useState('');
  const [showVoiceEdit, setShowVoiceEdit] = useState(false);

  /* checkout */
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [checkout, setCheckout] = useState({
    name:'', email:'', cpf:'', phone:'',
    cep:'', street:'', number:'', complement:'', district:'', city:'', state:'',
    delivery:'Padrão — R$ 12,90', payment:'Pix simulado',
    cardName:'', cardNumber:'', cardExpiry:'', cardCvv:'',
  });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  /* refs */
  const mainRef         = useRef(null);
  const searchRef       = useRef(null);
  const voiceRecRef     = useRef(null);
  const drawerRef       = useRef(null);
  const drawerCloseRef  = useRef(null);   // botão fechar do drawer
  const drawerOpenerRef = useRef(null);   // elemento que abriu o drawer
  const mobileMenuBtnRef = useRef(null);
  const errorSummaryRef = useRef(null);
  const checkoutHeadRef = useRef(null);
  const confirmRef      = useRef(null);
  const skipLinkRef     = useRef(null);

  /* trap de foco no drawer */
  useFocusTrap(drawerRef, drawer);

  /* ── persistência carrinho ── */
  useEffect(() => { localStorage.setItem('veste-cart', JSON.stringify(cart)); }, [cart]);

  /* ── notice auto-dismiss ── */
  useEffect(() => {
    if (notice) { const t = setTimeout(() => setNotice(''), 4500); return () => clearTimeout(t); }
  }, [notice]);

  /* ── foco no main ao mudar de página ── */
  useEffect(() => { mainRef.current?.focus({ preventScroll: true }); }, [page]);

  /* ── foco na confirmação ── */
  useEffect(() => {
    if (page === 'confirmation') confirmRef.current?.focus({ preventScroll: true });
  }, [page]);

  /* ── drawer: foco inicial e Escape ── */
  useEffect(() => {
    if (drawer) {
      // pequeno delay para garantir que o DOM renderizou
      const t = setTimeout(() => drawerCloseRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [drawer]);

  useEffect(() => {
    if (!drawer) return;
    function onKey(e) { if (e.key === 'Escape') closeDrawer(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawer]);

  /* ── menu mobile: foco e Escape ── */
  useEffect(() => {
    if (!mobileMenu) return;
    function onKey(e) { if (e.key === 'Escape') { setMobileMenu(false); mobileMenuBtnRef.current?.focus(); } }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenu]);

  /* ── error-summary: focar ao aparecer ── */
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setTimeout(() => errorSummaryRef.current?.focus(), 50);
    }
  }, [errors]);

  /* ── foco no cabeçalho da etapa de checkout ao avançar ── */
  useEffect(() => {
    if (page === 'checkout') {
      setTimeout(() => checkoutHeadRef.current?.focus({ preventScroll: true }), 50);
    }
  }, [checkoutStep, page]);

  /* ─── helpers ── */
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = cart.length
    ? (subtotal >= 250 ? 0 : (checkout.delivery.startsWith('Expressa') ? 24.9 : 12.9))
    : 0;

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    const q = query.trim().toLocaleLowerCase('pt-BR');
    if (q) list = list.filter(p =>
      [p.name, p.category, p.short, p.long, p.material, ...(p.features || []), ...p.colors.map(c => c.name)]
        .join(' ').toLocaleLowerCase('pt-BR').includes(q)
    );
    if (category !== 'Todas')  list = list.filter(p => p.category === category);
    if (filterCat !== 'Todas') list = list.filter(p => p.category === filterCat);
    if (filterSize)  list = list.filter(p => p.sizes.includes(filterSize));
    if (filterColor) list = list.filter(p => p.colors.some(c => c.name === filterColor));
    if (adaptedOnly) list = list.filter(p => p.adapted);
    list = list.filter(p => p.price <= maxPrice);
    if (sort === 'low')  list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'new')  list.reverse();
    return list;
  }, [query, category, filterCat, filterSize, filterColor, adaptedOnly, maxPrice, sort]);

  function go(p) {
    setPage(p);
    setDrawer(false);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  function openProduct(p) {
    setSelected(p);
    setVariantColor(p.colors[0].name);
    setVariantSize('');
    setQty(1);
    go('product');
  }

  function announce(s) { setNotice(s); }

  function closeDrawer() {
    setDrawer(false);
    // retornar foco ao elemento que abriu o drawer
    setTimeout(() => drawerOpenerRef.current?.focus(), 50);
  }

  function addToCart(e) {
    if (!variantSize) { announce('Escolha um tamanho antes de adicionar ao carrinho.'); return; }
    const key = `${selected.id}-${variantColor}-${variantSize}`;
    setCart(prev => {
      const exists = prev.find(i => i.key === key);
      return exists
        ? prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { key, id: selected.id, name: selected.name, price: selected.price, color: variantColor, size: variantSize, qty, image: selected.image, alt: selected.alt, adapted: selected.adapted }];
    });
    // guardar o elemento que disparou o drawer para restaurar o foco
    drawerOpenerRef.current = e?.currentTarget ?? null;
    announce(`${selected.name}, cor ${variantColor}, tamanho ${variantSize}, adicionado ao carrinho.`);
    setDrawer(true);
  }

  function changeQty(key, n) {
    setCart(prev => prev.map(i => i.key === key ? { ...i, qty: Math.max(1, Math.min(10, n)) } : i));
  }

  function removeItem(key) {
    const item = cart.find(i => i.key === key);
    setCart(prev => prev.filter(i => i.key !== key));
    announce(`${item?.name || 'Produto'} removido do carrinho.`);
  }

  /* ── síntese de voz ── */
  function startSpeech() {
    if (!('speechSynthesis' in window)) {
      setSpeechState('unsupported');
      announce('A leitura em voz alta não é compatível com este navegador. A descrição completa continua disponível em texto.');
      return;
    }
    if (speechState === 'speaking') { window.speechSynthesis.pause(); setSpeechState('paused'); return; }
    if (speechState === 'paused')   { window.speechSynthesis.resume(); setSpeechState('speaking'); return; }
    window.speechSynthesis.cancel();
    const text = `${selected.name}. ${selected.long} Material: ${selected.material}. Cuidados: ${selected.care}${selected.adapted ? '. Características adaptativas: ' + selected.features.join(', ') : ''}`;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR'; u.rate = .92;
    u.onstart = () => setSpeechState('speaking');
    u.onend   = () => setSpeechState('idle');
    u.onerror = () => setSpeechState('idle');
    setSpeechState('speaking');
    window.speechSynthesis.speak(u);
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeechState('idle');
  }

  /* ── reconhecimento de voz ── */
  function startVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setVoiceStatus('Seu navegador não oferece reconhecimento de voz. Digite sua busca no campo de texto.');
      setShowVoiceEdit(true);
      return;
    }
    try {
      const rec = new SR();
      voiceRecRef.current = rec;
      rec.lang = 'pt-BR'; rec.interimResults = false; rec.maxAlternatives = 1;
      rec.onstart  = () => setVoiceStatus('Ouvindo. Fale sua busca ou cancele a operação.');
      rec.onresult = e => {
        const text = e.results[0][0].transcript;
        setVoiceText(text); setQuery(text);
        setVoiceStatus('Texto reconhecido. Revise a consulta antes de pesquisar.');
        setShowVoiceEdit(true);
      };
      rec.onerror = e => setVoiceStatus(
        e.error === 'not-allowed'
          ? 'Permissão do microfone negada. Você pode digitar a busca normalmente.'
          : 'Não foi possível reconhecer a fala. Tente novamente ou digite sua busca.'
      );
      rec.onend = () => {};
      rec.start();
    } catch {
      setVoiceStatus('Não foi possível iniciar o microfone. Digite sua busca normalmente.');
      setShowVoiceEdit(true);
    }
  }

  function applyVoice() {
    setQuery(voiceText);
    setCategory('Todas');
    setFilterCat('Todas');
    setShowVoiceEdit(false);
    setVoiceStatus('');
    go('catalog');
  }

  /* ── checkout ── */
  function setField(k, v) { setCheckout(c => ({ ...c, [k]: v })); }

  function validateStep(step) {
    const e = {};
    if (step === 0) {
      if (!checkout.name.trim())  e.name  = 'Informe seu nome completo.';
      if (!/^\S+@\S+\.\S+$/.test(checkout.email)) e.email = 'Informe um e-mail válido.';
      if (!checkout.cpf.trim())   e.cpf   = 'Informe um CPF fictício para a demonstração.';
      if (!checkout.phone.trim()) e.phone = 'Informe um telefone.';
    }
    if (step === 1) {
      ['cep','street','number','district','city','state'].forEach(k => {
        if (!checkout[k].trim()) e[k] = 'Preencha este campo.';
      });
    }
    if (step === 2 && checkout.payment === 'Cartão demonstrativo') {
      if (!checkout.cardName.trim()) e.cardName = 'Informe o nome fictício no cartão.';
      if (checkout.cardNumber.replace(/\D/g,'').length < 12) e.cardNumber = 'Digite um número demonstrativo com pelo menos 12 dígitos.';
      if (!checkout.cardExpiry.trim()) e.cardExpiry = 'Informe a validade demonstrativa.';
      if (checkout.cardCvv.length < 3) e.cardCvv = 'Informe o código demonstrativo.';
    }
    setErrors(e);
    return !Object.keys(e).length;
  }

  function nextStep() {
    if (!validateStep(checkoutStep)) {
      announce('Existem campos para corrigir nesta etapa.');
      return;
    }
    setErrors({});
    if (checkoutStep < 3) {
      setCheckoutStep(s => s + 1);
    } else {
      const o = {
        number: `VS-${Math.floor(100000 + Math.random() * 899999)}`,
        date: '5 a 8 dias úteis (estimativa fictícia)',
        items: [...cart],
        total: subtotal + shipping,
        checkout: { ...checkout },
        shipping,
      };
      setOrder(o);
      setCart([]);
      go('confirmation');
    }
  }

  function updateSearch(e) { setQuery(e.target.value); setCategory('Todas'); }

  const categories = ['Todas', 'Camisetas', 'Camisas', 'Calças', 'Jaquetas', 'Vestidos'];

  /* ─── grade de produto ─────────────────────────────────────────────────────── */
  /*
    CORREÇÃO A3/G3: cada card agora tem apenas UM botão principal englobando
    a imagem e o nome do produto, e um segundo botão "Ver peça" com aria-label
    explícito. Isso elimina três ativações redundantes para o mesmo produto.
    CORREÇÃO A4: swatch wrapper usa role="img" + aria-label para que o nome
    das cores seja anunciado pelo leitor de tela.
  */
  const productCards = (list) => (
    <ul className="product-grid" aria-label="Produtos">
      {list.map(p => (
        <li key={p.id} className="product-card">
          {/* botão único que engloba imagem + nome */}
          <button
            className="product-card-primary"
            onClick={() => openProduct(p)}
            aria-label={`${p.name} — ${money(p.price)}. ${p.short} Ver detalhes.`}
          >
            <span className="image-wrap">
              <img src={imageUrl(p.image, 700)} alt={p.alt} loading="lazy" />
              <span className="image-tag" aria-hidden="true">{p.adapted ? 'Design adaptado' : p.category}</span>
            </span>
            <span className="product-meta">
              <span className="product-name" aria-hidden="true">{p.name}</span>
              <span className="product-short" aria-hidden="true">{p.short}</span>
            </span>
          </button>
          <div className="card-bottom">
            {/* CORREÇÃO A4: role="img" no wrapper dos swatches */}
            <span
              className="swatches"
              role="img"
              aria-label={`Cores disponíveis: ${p.colors.map(c => c.name).join(', ')}`}
            >
              {p.colors.slice(0, 4).map(c => (
                <span key={c.name} className="swatch" aria-hidden="true" style={{ background: c.hex }} />
              ))}
            </span>
            <strong aria-hidden="true">{money(p.price)}</strong>
          </div>
        </li>
      ))}
    </ul>
  );

  /* ─── skip-link com gestão de foco SPA ────────────────────────────────────── */
  /*
    CORREÇÃO B1: skip-link numa SPA não funciona via href="#id" porque o React
    não recarrega a página. Interceptamos o clique e chamamos .focus() diretamente.
  */
  function handleSkipLink(e) {
    e.preventDefault();
    mainRef.current?.focus({ preventScroll: false });
    mainRef.current?.scrollIntoView();
  }

  /* ─── header ───────────────────────────────────────────────────────────────── */
  const header = (
    <>
      {/* CORREÇÃO B1: onClick intercepta o comportamento padrão */}
      <a className="skip-link" href="#main-content" onClick={handleSkipLink} ref={skipLinkRef}>
        Pular para o conteúdo principal
      </a>

      <div className="topline" aria-hidden="true">
        Moda para viver do seu jeito{' '}
        <span>Descrições detalhadas. Escolhas livres.</span>
      </div>

      <header className="site-header">
        {/* CORREÇÃO B3: ref no botão de menu mobile para restaurar foco */}
        <button
          className="icon-btn mobile-menu-btn"
          aria-label={mobileMenu ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileMenu}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileMenu(v => !v)}
          ref={mobileMenuBtnRef}
        >
          {mobileMenu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <button className="wordmark" onClick={() => go('home')} aria-label="VESTE — página inicial">
          VESTE<span aria-hidden="true">.</span>
        </button>

        <nav className={`main-nav ${mobileMenu ? 'nav-open' : ''}`} aria-label="Navegação principal">
          <button onClick={() => { setCategory('Todas'); go('home'); }}>Início</button>
          <button onClick={() => { setCategory('Todas'); go('catalog'); }}>Feminino</button>
          <button onClick={() => { setCategory('Todas'); go('catalog'); }}>Masculino</button>
          <button onClick={() => { setAdaptedOnly(true); go('catalog'); }}>Roupas adaptadas</button>
          <button onClick={() => { setSort('new'); go('catalog'); }}>Novidades</button>
        </nav>

        <div className="header-actions">
          <form className="header-search" onSubmit={e => { e.preventDefault(); go('catalog'); }} role="search">
            <Search size={17} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search">Buscar roupas</label>
            <input
              id="site-search"
              ref={searchRef}
              value={query}
              onChange={updateSearch}
              placeholder="O que você procura?"
            />
            <button type="button" className="voice-mini" onClick={startVoice} aria-label="Buscar por voz">
              <Mic size={16} aria-hidden="true" />
            </button>
          </form>

          <button
            className="icon-btn bag-btn"
            onClick={() => go('cart')}
            aria-label={`Carrinho, ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}
          >
            <ShoppingBag aria-hidden="true" />
            <span className="bag-count" aria-hidden="true">{cartCount}</span>
          </button>
        </div>
      </header>

      {/* CORREÇÃO B3: mobile-nav com id referenciado, aria-label e hidden quando fechado */}
      <nav
        id="mobile-nav-panel"
        className={`mobile-nav-panel ${mobileMenu ? 'mobile-nav-visible' : ''}`}
        aria-label="Categorias de produtos"
        hidden={!mobileMenu}
      >
        {categories.map(c => (
          <button key={c} onClick={() => { setCategory(c); go('catalog'); }}>
            {c === 'Todas' ? 'Todas as peças' : c}
          </button>
        ))}
      </nav>

      {/* painel de busca por voz */}
      {voiceStatus && (
        <div className="voice-panel" role="status" aria-live="polite">
          <div>
            <strong>Busca por voz</strong>
            <p>{voiceStatus}</p>
          </div>
          <div className="voice-panel-actions">
            {voiceRecRef.current && (
              <button
                className="btn btn-secondary btn-small"
                onClick={() => { voiceRecRef.current?.stop(); setVoiceStatus('Busca por voz cancelada.'); }}
              >
                Cancelar
              </button>
            )}
            {showVoiceEdit && (
              <>
                <label className="sr-only" htmlFor="voice-edit">Editar texto reconhecido</label>
                <input id="voice-edit" value={voiceText} onChange={e => setVoiceText(e.target.value)} />
                <button className="btn btn-primary btn-small" onClick={applyVoice}>Pesquisar</button>
              </>
            )}
            <button
              className="icon-btn"
              aria-label="Fechar mensagem de busca por voz"
              onClick={() => { voiceRecRef.current?.stop(); setVoiceStatus(''); setShowVoiceEdit(false); }}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );

  /* ─── footer ───────────────────────────────────────────────────────────────── */
  const footer = (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <button className="wordmark footer-mark" onClick={() => go('home')} aria-label="VESTE — ir para página inicial">
            VESTE<span aria-hidden="true">.</span>
          </button>
          <p>Vista-se do seu jeito.</p>
          <p className="muted">Moda com liberdade de escolha.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <button onClick={() => go('catalog')}>Todas as peças</button>
          <button onClick={() => { setAdaptedOnly(true); go('catalog'); }}>Roupas adaptadas</button>
          <button onClick={() => go('catalog')}>Novidades</button>
        </div>
        <div>
          <h3>Ajuda</h3>
          <button onClick={() => go('accessibility')}>Guia de acessibilidade</button>
          <button onClick={() => go('accessibility')}>Trocas e devoluções</button>
          <button onClick={() => go('accessibility')}>Atendimento</button>
        </div>
        <div>
          <h3>Preferências de leitura</h3>
          <div className="footer-controls">
            <button className="btn btn-secondary btn-small" onClick={() => setTextScale(v => Math.min(150, v + 10))}>
              Aumentar texto +
            </button>
            <button className="btn btn-secondary btn-small" onClick={() => setTextScale(v => Math.max(90, v - 10))}>
              Diminuir texto −
            </button>
            <button
              className={`btn btn-small ${highContrast ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setHighContrast(v => !v)}
              aria-pressed={highContrast}
            >
              {highContrast ? 'Desativar alto contraste' : 'Alto contraste'}
            </button>
            <button
              className={`btn btn-small ${reducedMotion ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setReducedMotion(v => !v)}
              aria-pressed={reducedMotion}
            >
              {reducedMotion ? 'Movimento reduzido ativo' : 'Reduzir movimento'}
            </button>
          </div>
          {/* CORREÇÃO A7: anúncio de tamanho via aria-live */}
          <p className="muted" aria-live="polite" aria-atomic="true">
            Tamanho do texto: {textScale}%
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 VESTE — Projeto demonstrativo.</span>
        <span>Compra e pagamento são simulados. Nenhuma cobrança real é realizada.</span>
      </div>
    </footer>
  );

  /* ─── breadcrumb ──────────────────────────────────────────────────────────── */
  const breadcrumb = (items) => (
    <nav aria-label="Caminho de navegação" className="breadcrumb">
      <ol>
        <li><button onClick={() => go('home')}>Início</button></li>
        {items.map((x, i) => (
          <li key={x}>
            <span aria-hidden="true">/</span>
            <span aria-current={i === items.length - 1 ? 'page' : undefined}>{x}</span>
          </li>
        ))}
      </ol>
    </nav>
  );

  /* ─── campos de formulário ────────────────────────────────────────────────── */
  const errorField = (key) => (
    errors[key]
      ? <span className="field-error" id={`${key}-error`} role="alert">{errors[key]}</span>
      : null
  );

  const field = (label, key, opts = {}) => (
    <div className={`field ${errors[key] ? 'has-error' : ''}`} key={key}>
      <label htmlFor={key}>
        {label}
        {opts.optional && <span className="optional"> (opcional)</span>}
        {!opts.optional && <span className="sr-only"> (obrigatório)</span>}
      </label>
      <input
        id={key}
        value={checkout[key]}
        onChange={e => setField(key, e.target.value)}
        type={opts.type || 'text'}
        placeholder={opts.placeholder || ''}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        aria-required={!opts.optional}
        autoComplete={opts.auto || 'off'}
      />
      {errorField(key)}
    </div>
  );

  /* ─── render principal ─────────────────────────────────────────────────────── */
  return (
    <div
      className={`app ${highContrast ? 'high-contrast' : ''} ${reducedMotion ? 'reduce-motion' : ''}`}
      style={{ '--text-scale': textScale / 100 }}
    >
      {header}

      {/* CORREÇÃO B1: main com id para o skip-link e tabIndex=-1 para receber foco via JS */}
      <main id="main-content" ref={mainRef} tabIndex={-1}>

        {/* ── HOME ── */}
        {page === 'home' && (
          <>
            <section className="hero" aria-label="Apresentação da VESTE">
              <div className="hero-copy">
                <p className="eyebrow">COLEÇÃO • ESSENCIAIS DO DIA A DIA</p>
                <h1>Moda para viver<br /><em>do seu jeito.</em></h1>
                <p className="hero-desc">
                  Descubra roupas com descrições detalhadas, informações claras e uma experiência de compra pensada para sua autonomia.
                </p>
                <div className="hero-actions">
                  <button className="btn btn-primary" onClick={() => { setCategory('Todas'); go('catalog'); }}>
                    Explorar coleção <ArrowRight size={17} aria-hidden="true" />
                  </button>
                  <button className="btn btn-outline" onClick={() => { setAdaptedOnly(true); go('catalog'); }}>
                    Conhecer roupas adaptadas
                  </button>
                </div>
                <div className="hero-note">
                  <Accessibility size={19} aria-hidden="true" />
                  <span>Detalhes que você pode ler, ouvir e explorar no seu ritmo.</span>
                </div>
              </div>
              <div className="hero-visual" aria-hidden="true">
                <img
                  src={imageUrl('photo-1483985988355-763728e1935b', 1300)}
                  alt=""
                />
                <div className="hero-caption">
                  <span>01 / LIBERDADE DE ESCOLHA</span>
                  <span>Essenciais, sem excessos.</span>
                </div>
              </div>
            </section>

            <section className="value-strip" aria-label="Compromissos da VESTE">
              <div>
                <span className="value-number" aria-hidden="true">01</span>
                <div><strong>Informação clara</strong><p>Detalhes que ajudam a escolher.</p></div>
              </div>
              <div>
                <span className="value-number" aria-hidden="true">02</span>
                <div><strong>Estilo sem rótulos</strong><p>Convencional ou adaptado. Você decide.</p></div>
              </div>
              <div>
                <span className="value-number" aria-hidden="true">03</span>
                <div><strong>Autonomia em cada etapa</strong><p>Uma experiência pensada para todos.</p></div>
              </div>
            </section>

            <section className="section collection-section" aria-label="Escolhas da temporada">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">ESCOLHAS DA TEMPORADA</p>
                  <h2>Feitas para acompanhar você.</h2>
                  <p>Peças versáteis, descritas com cuidado e pensadas para a vida real.</p>
                </div>
                <button className="text-link" onClick={() => go('catalog')}>
                  Ver coleção completa <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              {productCards(PRODUCTS.slice(0, 4))}
            </section>

            <section className="adapted-feature" aria-label="Roupas adaptadas">
              <div className="adapted-photo">
                <img
                  src={imageUrl('photo-1551488831-00ddcb6c6bd3', 1000)}
                  alt="Detalhe de roupas contemporâneas em cabides, com diferentes texturas e tons neutros."
                />
              </div>
              <div className="adapted-copy">
                <p className="eyebrow">DESIGN QUE CONSIDERA DIFERENTES NECESSIDADES</p>
                <h2>Detalhes que fazem diferença.</h2>
                <p>
                  Fechamentos simplificados, etiquetas táteis e soluções práticas podem tornar o vestir mais fácil.
                  Cada recurso é descrito na peça em que está presente — sem pressupor o que funciona melhor para você.
                </p>
                <button className="btn btn-primary" onClick={() => { setAdaptedOnly(true); go('catalog'); }}>
                  Explorar peças adaptadas <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </section>

            <section className="quote-section" aria-label="Filosofia da VESTE">
              <p className="eyebrow">NOSSO JEITO DE FAZER</p>
              <blockquote>"A melhor escolha é aquela que faz sentido para você."</blockquote>
              <p>Informação para decidir. Liberdade para vestir.</p>
            </section>
          </>
        )}

        {/* ── CATÁLOGO ── */}
        {page === 'catalog' && (
          <section className="page-shell" aria-label="Catálogo de produtos">
            {breadcrumb(['Coleção'])}
            <div className="catalog-heading">
              <div>
                <p className="eyebrow">ENCONTRE SUA PRÓXIMA PEÇA</p>
                <h1>{adaptedOnly ? 'Roupas adaptadas' : category === 'Todas' ? 'Todas as peças' : category}</h1>
                <p>Explore por estilo, cor, tamanho ou características. Cada peça tem uma descrição detalhada.</p>
              </div>
              <form className="catalog-search" role="search" onSubmit={e => e.preventDefault()}>
                <label htmlFor="catalog-query">Buscar produtos</label>
                <div>
                  <Search size={18} aria-hidden="true" />
                  <input
                    id="catalog-query"
                    value={query}
                    onChange={updateSearch}
                    placeholder="Ex.: camisa azul"
                  />
                  <button type="button" className="voice-mini" onClick={startVoice} aria-label="Buscar por voz">
                    <Mic size={17} aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>

            {/*
              CORREÇÃO G1/B6: category-tabs como lista com role="tablist".
              Os botões recebem role="tab" + aria-selected para comunicar
              o estado de seleção a leitores de tela, e respondem a arrow keys.
            */}
            <div
              className="category-tabs"
              role="tablist"
              aria-label="Filtrar por categoria"
              onKeyDown={e => {
                const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]'));
                const idx = tabs.indexOf(document.activeElement);
                if (e.key === 'ArrowRight' && idx < tabs.length - 1) { e.preventDefault(); tabs[idx + 1].focus(); }
                if (e.key === 'ArrowLeft'  && idx > 0)               { e.preventDefault(); tabs[idx - 1].focus(); }
                if (e.key === 'Home') { e.preventDefault(); tabs[0].focus(); }
                if (e.key === 'End')  { e.preventDefault(); tabs[tabs.length - 1].focus(); }
              }}
            >
              {categories.map(c => {
                const isActive = category === c && filterCat === 'Todas';
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={isActive ? 'active' : ''}
                    onClick={() => { setCategory(c); setFilterCat('Todas'); if (c !== 'Todas') setAdaptedOnly(false); }}
                  >
                    {c === 'Todas' ? 'Todas as peças' : c}
                  </button>
                );
              })}
            </div>

            <div className="catalog-toolbar">
              {/* CORREÇÃO G2: aria-live no contador de resultados */}
              <span aria-live="polite" aria-atomic="true">
                <strong>{filtered.length}</strong> {filtered.length === 1 ? 'peça encontrada' : 'peças encontradas'}
              </span>
              <div className="toolbar-actions">
                <button
                  className="btn btn-secondary btn-small"
                  onClick={() => setFiltersOpen(v => !v)}
                  aria-expanded={filtersOpen}
                  aria-controls="filters-panel"
                >
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  {filtersOpen ? 'Ocultar filtros' : 'Filtros'}
                </button>
                <label className="sort-control">
                  Ordenar por{' '}
                  <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="relevance">Relevância</option>
                    <option value="low">Menor preço</option>
                    <option value="high">Maior preço</option>
                    <option value="new">Novidades</option>
                  </select>
                </label>
              </div>
            </div>

            {filtersOpen && (
              <div id="filters-panel" className="filters-panel" role="group" aria-label="Filtros de busca">
                <div className="field">
                  <label htmlFor="filter-category">Categoria</label>
                  <select id="filter-category" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="filter-size">Tamanho</label>
                  <select id="filter-size" value={filterSize} onChange={e => setFilterSize(e.target.value)}>
                    <option value="">Todos</option>
                    {['PP','P','M','G','GG','36','38','40','42','44','46'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="filter-color">Cor</label>
                  <select id="filter-color" value={filterColor} onChange={e => setFilterColor(e.target.value)}>
                    <option value="">Todas</option>
                    {[...new Set(PRODUCTS.flatMap(p => p.colors.map(c => c.name)))].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="field price-filter">
                  <label htmlFor="max-price">Preço máximo: {money(maxPrice)}</label>
                  <input
                    id="max-price"
                    type="range"
                    min="50" max="350" step="10"
                    value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    aria-valuemin={50} aria-valuemax={350} aria-valuenow={maxPrice}
                    aria-valuetext={money(maxPrice)}
                  />
                </div>
                <label className="check-row">
                  <input type="checkbox" checked={adaptedOnly} onChange={e => setAdaptedOnly(e.target.checked)} />
                  {' '}Mostrar apenas peças adaptadas
                </label>
                <button
                  className="text-link"
                  onClick={() => {
                    setCategory('Todas'); setFilterCat('Todas'); setFilterSize('');
                    setFilterColor(''); setAdaptedOnly(false); setMaxPrice(350); setQuery('');
                  }}
                >
                  Limpar filtros <RotateCcw size={14} aria-hidden="true" />
                </button>
              </div>
            )}

            {/* CORREÇÃO G3: aria-label explícito nos botões de remoção de filtro ativo */}
            {(filterSize || filterColor || adaptedOnly || filterCat !== 'Todas' || category !== 'Todas' || query) && (
              <div className="active-filters" aria-label="Filtros ativos">
                <span>Filtros ativos:</span>
                {query      && <button onClick={() => setQuery('')}      aria-label={`Remover filtro: busca por ${query}`}>Busca: {query} ×</button>}
                {filterSize && <button onClick={() => setFilterSize('')} aria-label={`Remover filtro: tamanho ${filterSize}`}>Tamanho: {filterSize} ×</button>}
                {filterColor && <button onClick={() => setFilterColor('')} aria-label={`Remover filtro: cor ${filterColor}`}>Cor: {filterColor} ×</button>}
                {adaptedOnly && <button onClick={() => setAdaptedOnly(false)} aria-label="Remover filtro: apenas peças adaptadas">Adaptadas ×</button>}
              </div>
            )}

            {filtered.length ? productCards(filtered) : (
              <div className="empty-state">
                <Search size={30} aria-hidden="true" />
                <h2>Nenhuma peça encontrada</h2>
                <p>Tente outro termo ou remova alguns filtros para ver mais opções.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => { setQuery(''); setCategory('Todas'); setFilterCat('Todas'); setFilterSize(''); setFilterColor(''); setAdaptedOnly(false); setMaxPrice(350); }}
                >
                  Limpar busca e filtros
                </button>
              </div>
            )}
          </section>
        )}

        {/* ── PRODUTO ── */}
        {page === 'product' && (
          <section className="page-shell" aria-label={`Detalhes de ${selected.name}`}>
            {breadcrumb(['Coleção', selected.name])}
            <div className="product-detail">
              <div className="detail-gallery">
                <div className="detail-main-image">
                  <img src={imageUrl(selected.image, 1200)} alt={selected.alt} />
                  <span className="image-tag" aria-hidden="true">
                    {selected.adapted ? 'Design adaptado' : selected.category}
                  </span>
                </div>
                <div className="image-description">
                  <strong>Sobre a imagem</strong>
                  <p>{selected.alt}</p>
                </div>
              </div>

              <div className="detail-info">
                <p className="eyebrow">
                  {selected.category.toUpperCase()}{selected.adapted ? ' / DESIGN ADAPTADO' : ''}
                </p>
                <h1>{selected.name}</h1>
                <p className="detail-price">{money(selected.price)}</p>
                <p className="detail-short">{selected.short}</p>

                {/* controles de áudio */}
                <div className="audio-controls">
                  <button className="btn btn-secondary" onClick={startSpeech}>
                    {speechState === 'speaking'
                      ? <><Pause size={17} aria-hidden="true" /> Pausar descrição</>
                      : speechState === 'paused'
                      ? <><Play  size={17} aria-hidden="true" /> Retomar descrição</>
                      : <><Volume2 size={17} aria-hidden="true" /> Ouvir descrição do produto</>
                    }
                  </button>
                  {speechState !== 'idle' && speechState !== 'unsupported' && (
                    <button className="btn btn-outline" onClick={stopSpeech}>
                      <Square size={15} aria-hidden="true" /> Parar
                    </button>
                  )}
                </div>
                <p className="sr-only" aria-live="polite">
                  {speechState === 'speaking'  ? 'Descrição sendo reproduzida.'    :
                   speechState === 'paused'    ? 'Descrição pausada.'              :
                   speechState === 'unsupported'? 'Leitura em voz alta indisponível.' : ''}
                </p>

                <div className="detail-divider" />

                {/* seleção de cor */}
                <fieldset className="choice-field">
                  <legend>Cor: <strong>{variantColor}</strong></legend>
                  <div className="color-options">
                    {selected.colors.map(c => (
                      <button
                        type="button"
                        key={c.name}
                        className={`color-choice ${variantColor === c.name ? 'selected' : ''}`}
                        onClick={() => setVariantColor(c.name)}
                        aria-pressed={variantColor === c.name}
                        aria-label={`${c.name}${variantColor === c.name ? ', selecionado' : ''}`}
                      >
                        <span className="swatch large" aria-hidden="true" style={{ background: c.hex }} />
                        <span>{c.name}</span>
                        {variantColor === c.name && <Check size={15} aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* seleção de tamanho */}
                <fieldset className="choice-field">
                  <legend>Tamanho: <strong>{variantSize || 'Selecione'}</strong></legend>
                  <div className="size-options">
                    {selected.sizes.map(s => (
                      <button
                        type="button"
                        key={s}
                        className={`size-choice ${variantSize === s ? 'selected' : ''}`}
                        onClick={() => setVariantSize(s)}
                        aria-pressed={variantSize === s}
                        aria-label={`Tamanho ${s}${variantSize === s ? ', selecionado' : ''}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    className="text-link size-guide-link"
                    onClick={() => document.getElementById('size-guide')?.scrollIntoView({
                      behavior: reducedMotion ? 'auto' : 'smooth', block: 'center',
                    })}
                  >
                    Consultar guia de tamanhos <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  {!variantSize && <p className="helper-text">Escolha um tamanho para adicionar esta peça ao carrinho.</p>}
                </fieldset>

                {/* quantidade */}
                <div className="quantity-row">
                  <label htmlFor="product-qty">Quantidade</label>
                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      onClick={() => setQty(v => Math.max(1, v - 1))}
                      disabled={qty <= 1}
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <output id="product-qty" aria-live="polite" aria-label={`Quantidade: ${qty}`}>{qty}</output>
                    <button
                      type="button"
                      aria-label="Aumentar quantidade"
                      onClick={() => setQty(v => Math.min(10, v + 1))}
                      disabled={qty >= 10}
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <button className="btn btn-primary add-cart-btn" onClick={addToCart}>
                  Adicionar ao carrinho <ArrowRight size={17} aria-hidden="true" />
                </button>

                <div className="shipping-note">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>Disponibilidade simulada. Frete calculado no carrinho.<br />Frete grátis em pedidos acima de R$ 250.</span>
                </div>

                <div className="detail-divider" />

                <section className="description-block" aria-label="Descrição detalhada do produto">
                  <h2>Descrição detalhada</h2>
                  <p>{selected.long}</p>
                  <h3>Material e composição</h3>
                  <p>{selected.material}.</p>
                  <h3>Cuidados com a peça</h3>
                  <p>{selected.care}</p>
                  {selected.adapted && (
                    <>
                      <h3>Características adaptativas</h3>
                      <ul>{selected.features.map(f => <li key={f}>{f}</li>)}</ul>
                    </>
                  )}
                </section>
              </div>
            </div>

            {/* guia de tamanhos */}
            <section id="size-guide" className="size-guide" aria-label="Guia de tamanhos">
              <div>
                <p className="eyebrow">ESCOLHA COM INFORMAÇÃO</p>
                <h2>Guia de tamanhos</h2>
                <p>As medidas são aproximadas e estão em centímetros. Para comparar, meça uma peça semelhante que você já utiliza, estendida sobre uma superfície plana.</p>
                <p><strong>Largura:</strong> medida de um lado ao outro da peça. <strong>Comprimento:</strong> medida do ponto mais alto do ombro até a barra.</p>
              </div>
              <div className="table-wrap">
                <table>
                  <caption>Medidas aproximadas de {selected.name}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Tamanho</th>
                      <th scope="col">Largura (cm)</th>
                      <th scope="col">Comprimento (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.measurements.map(m => (
                      <tr key={m[0]}>
                        <th scope="row">{m[0]}</th>
                        <td>{m[1]}</td>
                        <td>{m[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="section related-section" aria-label="Produtos relacionados">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">CONTINUE EXPLORANDO</p>
                  <h2>Você também pode gostar.</h2>
                </div>
                <button className="text-link" onClick={() => go('catalog')}>
                  Ver tudo <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
              {productCards(PRODUCTS.filter(p => p.id !== selected.id).slice(0, 4))}
            </section>
          </section>
        )}

        {/* ── CARRINHO ── */}
        {page === 'cart' && (
          <section className="page-shell" aria-label="Carrinho de compras">
            {breadcrumb(['Meu carrinho'])}
            <div className="page-title">
              <p className="eyebrow">REVISE SUAS ESCOLHAS</p>
              <h1>
                Meu carrinho{' '}
                <span className="count-inline">({cartCount} {cartCount === 1 ? 'item' : 'itens'})</span>
              </h1>
            </div>
            {!cart.length ? (
              <div className="empty-state cart-empty">
                <ShoppingBag size={34} aria-hidden="true" />
                <h2>Seu carrinho está esperando por você.</h2>
                <p>Explore as peças e encontre algo que combine com seu jeito.</p>
                <button className="btn btn-primary" onClick={() => go('catalog')}>
                  Explorar coleção <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="cart-layout">
                <section className="cart-items" aria-label="Produtos no carrinho">
                  {cart.map(item => (
                    <article className="cart-item" key={item.key}>
                      <button
                        className="cart-image"
                        onClick={() => openProduct(PRODUCTS.find(p => p.id === item.id))}
                        aria-label={`Ver detalhes de ${item.name}`}
                      >
                        <img src={imageUrl(item.image, 350)} alt={item.alt} />
                      </button>
                      <div className="cart-item-info">
                        <button
                          className="product-name"
                          onClick={() => openProduct(PRODUCTS.find(p => p.id === item.id))}
                          aria-label={`Ver detalhes de ${item.name}`}
                        >
                          {item.name}
                        </button>
                        <p>Cor: {item.color}</p>
                        <p>Tamanho: {item.size}</p>
                        {item.adapted && <span className="text-tag">Design adaptado</span>}
                        <strong>{money(item.price)}</strong>
                        <div className="cart-item-actions">
                          <div className="quantity-control" role="group" aria-label={`Quantidade de ${item.name}`}>
                            <button
                              aria-label={`Diminuir quantidade de ${item.name}`}
                              onClick={() => changeQty(item.key, item.qty - 1)}
                              disabled={item.qty <= 1}
                            >
                              <Minus size={15} aria-hidden="true" />
                            </button>
                            <output aria-live="polite" aria-label={`${item.qty} ${item.qty === 1 ? 'unidade' : 'unidades'}`}>
                              {item.qty}
                            </output>
                            <button
                              aria-label={`Aumentar quantidade de ${item.name}`}
                              onClick={() => changeQty(item.key, item.qty + 1)}
                              disabled={item.qty >= 10}
                            >
                              <Plus size={15} aria-hidden="true" />
                            </button>
                          </div>
                          <button className="remove-btn" onClick={() => removeItem(item.key)}>
                            <Trash2 size={15} aria-hidden="true" /> Remover {item.name}
                          </button>
                        </div>
                      </div>
                      <strong className="item-total" aria-label={`Total: ${money(item.price * item.qty)}`}>
                        {money(item.price * item.qty)}
                      </strong>
                    </article>
                  ))}
                </section>

                <aside className="order-summary" aria-label="Resumo do pedido">
                  <h2>Resumo do pedido</h2>
                  <div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                  <div className="summary-line"><span>Frete</span><strong>{shipping === 0 ? 'Grátis' : money(shipping)}</strong></div>
                  {subtotal < 250 && (
                    <p className="helper-text">
                      Faltam {money(250 - subtotal)} para ganhar frete grátis.
                    </p>
                  )}
                  <div className="coupon-form">
                    <label htmlFor="coupon">Cupom de desconto</label>
                    <div>
                      <input id="coupon" placeholder="Ex.: VESTE10" />
                      <button
                        className="btn btn-secondary btn-small"
                        onClick={() => announce('Cupons não estão habilitados nesta demonstração.')}
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                  <div className="summary-total">
                    <span>Total</span>
                    <strong>{money(subtotal + shipping)}</strong>
                  </div>
                  <p className="muted">O pagamento é simulado. Nenhuma cobrança será realizada.</p>
                  <button
                    className="btn btn-primary full-width"
                    onClick={() => { setCheckoutStep(0); setErrors({}); go('checkout'); }}
                  >
                    Finalizar compra <ArrowRight size={17} aria-hidden="true" />
                  </button>
                  <button className="text-link continue-link" onClick={() => go('catalog')}>
                    <ArrowLeft size={15} aria-hidden="true" /> Continuar comprando
                  </button>
                </aside>
              </div>
            )}
          </section>
        )}

        {/* ── CHECKOUT ── */}
        {page === 'checkout' && (
          <section className="page-shell checkout-page" aria-label="Finalizar compra">
            {breadcrumb(['Carrinho', 'Finalizar compra'])}
            <div className="page-title">
              <p className="eyebrow">COMPRA DEMONSTRATIVA</p>
              <h1>Finalizar compra</h1>
              <p>Você não precisa criar uma conta. Seus dados não são enviados a um servidor.</p>
            </div>

            {!cart.length ? (
              <div className="empty-state">
                <h2>Seu carrinho está vazio.</h2>
                <button className="btn btn-primary" onClick={() => go('catalog')}>Explorar peças</button>
              </div>
            ) : (
              <>
                {/*
                  CORREÇÃO D4: steps com ícone Check recebem aria-hidden="true"
                  e o estado "concluído" é comunicado via texto sr-only.
                */}
                <ol className="checkout-steps" aria-label="Etapas da compra">
                  {['Identificação', 'Endereço', 'Entrega e pagamento', 'Revisão'].map((s, i) => (
                    <li
                      key={s}
                      className={`${i === checkoutStep ? 'current' : ''} ${i < checkoutStep ? 'completed' : ''}`}
                      aria-current={i === checkoutStep ? 'step' : undefined}
                    >
                      <span className="step-number" aria-hidden="true">
                        {i < checkoutStep ? <Check size={16} aria-hidden="true" /> : i + 1}
                      </span>
                      <span>
                        {s}
                        {i < checkoutStep && <span className="sr-only"> (concluído)</span>}
                        {i === checkoutStep && <span className="sr-only"> (etapa atual)</span>}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="checkout-layout">
                  <section className="checkout-form-area" aria-label="Formulário de compra">
                    {/*
                      CORREÇÃO D1: error-summary com ref para receber foco ao aparecer.
                      O foco é movido via useEffect quando errors mudam.
                    */}
                    {Object.keys(errors).length > 0 && (
                      <div
                        className="error-summary"
                        role="alert"
                        tabIndex={-1}
                        ref={errorSummaryRef}
                      >
                        <strong>Confira as informações abaixo.</strong>
                        <p>Há campos que precisam ser corrigidos antes de continuar.</p>
                      </div>
                    )}

                    {/*
                      CORREÇÃO D2: h2 de cada etapa tem ref para receber foco ao avançar.
                      O foco é movido via useEffect quando checkoutStep muda.
                    */}
                    {checkoutStep === 0 && (
                      <>
                        <h2 tabIndex={-1} ref={checkoutHeadRef}>Seus dados</h2>
                        <p className="form-intro">Usaremos essas informações apenas para demonstrar o fluxo de compra.</p>
                        <div className="form-grid">
                          {field('Nome completo', 'name', { auto: 'name' })}
                          {field('E-mail', 'email', { type: 'email', auto: 'email' })}
                          {field('CPF fictício', 'cpf', { placeholder: '000.000.000-00' })}
                          {field('Telefone', 'phone', { auto: 'tel', placeholder: '(00) 00000-0000' })}
                        </div>
                      </>
                    )}

                    {checkoutStep === 1 && (
                      <>
                        <h2 tabIndex={-1} ref={checkoutHeadRef}>Endereço de entrega</h2>
                        <p className="form-intro">Preencha o endereço para a simulação de entrega.</p>
                        <div className="form-grid">
                          {field('CEP', 'cep', { auto: 'postal-code', placeholder: '00000-000' })}
                          {field('Rua', 'street', { auto: 'address-line1' })}
                          {field('Número', 'number', { auto: 'address-line2' })}
                          {field('Complemento', 'complement', { optional: true })}
                          {field('Bairro', 'district')}
                          {field('Cidade', 'city', { auto: 'address-level2' })}
                          {field('Estado', 'state', { auto: 'address-level1', placeholder: 'Ex.: SP' })}
                        </div>
                      </>
                    )}

                    {checkoutStep === 2 && (
                      <>
                        <h2 tabIndex={-1} ref={checkoutHeadRef}>Entrega e pagamento</h2>
                        <fieldset className="radio-field">
                          <legend>Escolha a entrega</legend>
                          {['Padrão — R$ 12,90', 'Expressa — R$ 24,90'].map((s, i) => (
                            <label className="radio-card" key={s}>
                              <input type="radio" name="delivery" checked={checkout.delivery === s} onChange={() => setField('delivery', s)} />
                              <span>
                                <strong>{i ? 'Entrega expressa' : 'Entrega padrão'}</strong>
                                <small>{i ? '2 a 4 dias úteis (estimativa fictícia)' : '5 a 8 dias úteis (estimativa fictícia)'}</small>
                              </span>
                              <b>{i ? 'R$ 24,90' : 'R$ 12,90'}</b>
                            </label>
                          ))}
                        </fieldset>
                        <fieldset className="radio-field">
                          <legend>Forma de pagamento</legend>
                          {['Pix simulado', 'Cartão demonstrativo'].map(s => (
                            <label className="radio-card" key={s}>
                              <input type="radio" name="payment" checked={checkout.payment === s} onChange={() => setField('payment', s)} />
                              <span>
                                <strong>{s}</strong>
                                <small>{s === 'Pix simulado' ? 'Nenhuma transação será realizada.' : 'Use somente dados fictícios para testar.'}</small>
                              </span>
                            </label>
                          ))}
                        </fieldset>
                        {checkout.payment === 'Cartão demonstrativo' && (
                          <div className="form-grid card-fields">
                            {field('Nome fictício no cartão', 'cardName')}
                            {field('Número demonstrativo', 'cardNumber', { placeholder: '0000 0000 0000 0000' })}
                            {field('Validade fictícia', 'cardExpiry', { placeholder: 'MM/AA' })}
                            {field('Código demonstrativo', 'cardCvv', { placeholder: '000' })}
                          </div>
                        )}
                        <p className="demo-notice">
                          <Info size={17} aria-hidden="true" /> Demonstração: não insira dados reais de pagamento.
                        </p>
                      </>
                    )}

                    {checkoutStep === 3 && (
                      <>
                        <h2 tabIndex={-1} ref={checkoutHeadRef}>Revise seu pedido</h2>
                        <p className="form-intro">Confira todos os detalhes antes de confirmar a simulação.</p>
                        <div className="review-section">
                          <h3>Seus dados</h3>
                          <p>{checkout.name}</p>
                          <p>{checkout.email} · {checkout.phone}</p>
                          <button className="text-link" onClick={() => setCheckoutStep(0)}>Editar identificação</button>
                        </div>
                        <div className="review-section">
                          <h3>Endereço de entrega</h3>
                          <p>{checkout.street}, {checkout.number}{checkout.complement ? `, ${checkout.complement}` : ''}</p>
                          <p>{checkout.district}, {checkout.city} — {checkout.state}, {checkout.cep}</p>
                          <button className="text-link" onClick={() => setCheckoutStep(1)}>Editar endereço</button>
                        </div>
                        <div className="review-section">
                          <h3>Entrega e pagamento</h3>
                          <p>{checkout.delivery}</p>
                          <p>{checkout.payment}</p>
                          <button className="text-link" onClick={() => setCheckoutStep(2)}>Editar entrega e pagamento</button>
                        </div>
                        <div className="review-section">
                          <h3>Produtos</h3>
                          {cart.map(i => (
                            <div className="review-product" key={i.key}>
                              <span>{i.name} · {i.color} · tam. {i.size} · qtd. {i.qty}</span>
                              <strong>{money(i.price * i.qty)}</strong>
                            </div>
                          ))}
                        </div>
                        <div className="demo-notice">
                          <Info size={17} aria-hidden="true" /> Ao confirmar, você verá um pedido fictício. Nenhum pagamento ou envio real será realizado.
                        </div>
                      </>
                    )}

                    <div className="checkout-nav">
                      {checkoutStep > 0 && (
                        <button className="btn btn-secondary" onClick={() => { setCheckoutStep(s => s - 1); setErrors({}); }}>
                          <ArrowLeft size={16} aria-hidden="true" /> Voltar
                        </button>
                      )}
                      <button className="btn btn-primary" onClick={nextStep}>
                        {checkoutStep === 3 ? 'Confirmar pedido' : 'Continuar'}{' '}
                        <ArrowRight size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </section>

                  <aside className="order-summary checkout-summary" aria-label="Resumo do seu pedido">
                    <h2>Seu pedido</h2>
                    {cart.map(i => (
                      <div className="mini-order-item" key={i.key}>
                        {/* alt="" pois o nome já está no texto abaixo */}
                        <img src={imageUrl(i.image, 180)} alt="" />
                        <div>
                          <strong>{i.name}</strong>
                          <p>{i.color} · {i.size} · qtd. {i.qty}</p>
                          <span>{money(i.price * i.qty)}</span>
                        </div>
                      </div>
                    ))}
                    <div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                    <div className="summary-line"><span>Frete</span><strong>{shipping === 0 ? 'Grátis' : money(shipping)}</strong></div>
                    <div className="summary-total"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div>
                    <p className="muted">Ambiente demonstrativo e sem cobrança real.</p>
                  </aside>
                </div>
              </>
            )}
          </section>
        )}

        {/* ── CONFIRMAÇÃO ── */}
        {page === 'confirmation' && order && (
          <section
            className="page-shell confirmation-page"
            aria-label="Pedido confirmado"
            /* CORREÇÃO D3: ref para foco ao chegar na confirmação */
            ref={confirmRef}
            tabIndex={-1}
          >
            <div className="confirmation-icon" aria-hidden="true">
              <CheckCircle2 size={38} />
            </div>
            <p className="eyebrow">OBRIGADO POR ESCOLHER A VESTE</p>
            <h1>Pedido confirmado<br /><em>com sucesso.</em></h1>
            <p className="confirmation-intro">
              Esta é uma confirmação demonstrativa. Nenhum pagamento foi processado e nenhum produto será enviado.
            </p>
            <div className="order-number">
              <span>Número do pedido fictício</span>
              <strong>{order.number}</strong>
            </div>
            <div className="confirmation-grid">
              <section className="review-section" aria-label="Resumo da compra">
                <h2>Resumo da compra</h2>
                {order.items.map(i => (
                  <div className="review-product" key={i.key}>
                    <span>{i.name} · {i.color} · {i.size} · qtd. {i.qty}</span>
                    <strong>{money(i.price * i.qty)}</strong>
                  </div>
                ))}
                <div className="summary-line">
                  <span>Frete</span>
                  <strong>{order.shipping === 0 ? 'Grátis' : money(order.shipping)}</strong>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <strong>{money(order.total)}</strong>
                </div>
              </section>
              <section className="review-section" aria-label="Dados de entrega">
                <h2>Entrega</h2>
                <p>{order.checkout.name}</p>
                <p>{order.checkout.street}, {order.checkout.number}{order.checkout.complement ? `, ${order.checkout.complement}` : ''}</p>
                <p>{order.checkout.district}, {order.checkout.city} — {order.checkout.state}</p>
                <p>{order.checkout.cep}</p>
                <h3>Previsão ilustrativa</h3>
                <p>{order.date}</p>
                <h3>Pagamento</h3>
                <p>{order.checkout.payment}</p>
              </section>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => { setOrder(null); setQuery(''); setCategory('Todas'); go('catalog'); }}
            >
              Continuar comprando <ArrowRight size={17} aria-hidden="true" />
            </button>
          </section>
        )}

        {/* ── ACESSIBILIDADE ── */}
        {page === 'accessibility' && (
          <section className="page-shell accessibility-page" aria-label="Guia de acessibilidade e atendimento">
            {breadcrumb(['Acessibilidade e atendimento'])}
            <div className="accessibility-hero">
              <p className="eyebrow">ACESSO PARA DIFERENTES JEITOS DE NAVEGAR</p>
              <h1>Autonomia em cada escolha.</h1>
              <p>Reunimos orientações para você explorar a VESTE com teclado, leitor de tela, ampliação de conteúdo e recursos de voz compatíveis com seu navegador.</p>
            </div>
            <div className="accessibility-grid">
              <article>
                <Accessibility size={25} aria-hidden="true" />
                <h2>Navegação por teclado</h2>
                <p>Use Tab para avançar, Shift + Tab para voltar e Enter ou Espaço para ativar controles. O link "Pular para o conteúdo principal" aparece ao iniciar a navegação por teclado. Menus podem ser fechados com a tecla Escape.</p>
              </article>
              <article>
                <Volume2 size={25} aria-hidden="true" />
                <h2>Leitores de tela</h2>
                <p>A interface utiliza títulos, regiões, rótulos de formulário e botões com nomes descritivos. Mensagens importantes, como atualizações do carrinho, são anunciadas. A experiência deve ser validada com leitores de tela reais antes de qualquer uso em produção.</p>
              </article>
              <article>
                <Volume2 size={25} aria-hidden="true" />
                <h2>Ouvir descrições</h2>
                <p>Na página de cada produto, selecione "Ouvir descrição do produto". A reprodução usa a síntese de voz do navegador quando disponível e pode ser pausada, retomada ou interrompida. A descrição completa permanece disponível em texto.</p>
              </article>
              <article>
                <Mic size={25} aria-hidden="true" />
                <h2>Busca por voz</h2>
                <p>Use o botão "Buscar por voz" ao lado do campo de pesquisa. Se o navegador suportar reconhecimento de fala, você poderá revisar o texto reconhecido antes de pesquisar. Se não houver suporte ou permissão, a busca por texto continua disponível.</p>
              </article>
              <article>
                <Search size={25} aria-hidden="true" />
                <h2>Cores, materiais e medidas</h2>
                <p>As cores são identificadas por nomes, não apenas por amostras visuais. As descrições apresentam modelagem, aparência e recursos adaptativos declarados. O guia de tamanhos oferece medidas em centímetros e orientação textual.</p>
              </article>
              <article>
                <Info size={25} aria-hidden="true" />
                <h2>Atendimento e barreiras</h2>
                <p>Este protótipo não possui atendimento humano integrado. Para um produto real, recomendamos disponibilizar um canal de contato acessível e um formulário para relatar barreiras, com confirmação clara e alternativa por e-mail ou telefone.</p>
              </article>
            </div>
            <div className="accessibility-note">
              <h2>Um compromisso em evolução</h2>
              <p>A interface foi construída considerando princípios de WCAG 2.2 AA, mas isso não equivale a uma certificação de conformidade. São necessários testes com teclado, ampliação, leitores de tela e pessoas com diferentes necessidades de acesso.</p>
              <button className="btn btn-primary" onClick={() => go('catalog')}>
                Explorar a loja <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </section>
        )}
      </main>

      {footer}

      {/* ── TOAST ── */}
      {notice && (
        <div className="toast" role="status" aria-live="polite">
          <CheckCircle2 size={19} aria-hidden="true" />
          <span>{notice}</span>
          <button aria-label="Fechar mensagem" onClick={() => setNotice('')}>
            <X size={17} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* ── DRAWER (MINI-CARRINHO) ──
          CORREÇÃO C1-C3:
          - ref no container para o focus trap (useFocusTrap hook)
          - ref no botão fechar para foco inicial
          - Escape fecha o drawer (useEffect acima)
          - ao fechar, foco retorna ao botão "Adicionar ao carrinho" (drawerOpenerRef)
          - backdrop clicável com mouse E acessível por teclado (role + onKeyDown)
      */}
      {drawer && (
        <div
          className="drawer-backdrop"
          role="presentation"
          onMouseDown={e => { if (e.target === e.currentTarget) closeDrawer(); }}
        >
          <section
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            ref={drawerRef}
          >
            <div className="drawer-head">
              <h2 id="drawer-title">Adicionado ao carrinho</h2>
              <button
                className="icon-btn"
                onClick={closeDrawer}
                aria-label="Fechar carrinho"
                ref={drawerCloseRef}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="drawer-confirm">
              <CheckCircle2 size={34} aria-hidden="true" />
              <p>O item foi adicionado ao seu carrinho.</p>
            </div>
            {cart.slice(-1).map(i => (
              <div className="mini-order-item" key={i.key}>
                <img src={imageUrl(i.image, 180)} alt={i.alt} />
                <div>
                  <strong>{i.name}</strong>
                  <p>{i.color} · tamanho {i.size} · qtd. {i.qty}</p>
                  <strong>{money(i.price * i.qty)}</strong>
                </div>
              </div>
            ))}
            <div className="drawer-total">
              <span>Subtotal atual</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <button className="btn btn-primary full-width" onClick={() => { closeDrawer(); go('cart'); }}>
              Ir para o carrinho <ArrowRight size={17} aria-hidden="true" />
            </button>
            <button className="btn btn-outline full-width" onClick={closeDrawer}>
              Continuar comprando
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
