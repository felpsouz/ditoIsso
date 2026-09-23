"use client";

import { useEffect, useMemo, useState } from "react";

type Municipio = {
  id: string;
  nome: string;
  x: number; // posição % no mapa (esquerda) — usado só no fallback
  y: number; // posição % no mapa (topo) — usado só no fallback
  capital?: boolean;
};

const MUNICIPIOS: Municipio[] = [
  { id: "canide-de-sao-francisco", nome: "Canindé de São Francisco", x: 14, y: 10 },
  { id: "poco-redondo", nome: "Poço Redondo", x: 22, y: 18 },
  { id: "porto-da-folha", nome: "Porto da Folha", x: 30, y: 20 },
  { id: "nossa-senhora-da-gloria", nome: "Nossa Senhora da Glória", x: 27, y: 30 },
  { id: "gararu", nome: "Gararu", x: 38, y: 14 },
  { id: "monte-alegre-de-sergipe", nome: "Monte Alegre de Sergipe", x: 18, y: 22 },
  { id: "itabi", nome: "Itabi", x: 24, y: 10 },
  { id: "gracho-cardoso", nome: "Gracho Cardoso", x: 35, y: 27 },
  { id: "feira-nova", nome: "Feira Nova", x: 32, y: 34 },
  { id: "carira", nome: "Carira", x: 29, y: 41 },
  { id: "frei-paulo", nome: "Frei Paulo", x: 39, y: 39 },
  { id: "nossa-senhora-aparecida", nome: "Nossa Senhora Aparecida", x: 34, y: 46 },
  { id: "pedra-mole", nome: "Pedra Mole", x: 23, y: 36 },
  { id: "pinhao", nome: "Pinhão", x: 20, y: 43 },
  { id: "ribeiropolis", nome: "Ribeirópolis", x: 37, y: 33 },
  { id: "propria", nome: "Propriá", x: 57, y: 12 },
  { id: "neopolis", nome: "Neópolis", x: 65, y: 9 },
  { id: "ilha-das-flores", nome: "Ilha das Flores", x: 70, y: 6 },
  { id: "brejo-grande", nome: "Brejo Grande", x: 76, y: 4 },
  { id: "cedro-de-sao-joao", nome: "Cedro de São João", x: 52, y: 15 },
  { id: "canhoba", nome: "Canhoba", x: 46, y: 12 },
  { id: "amparo-de-sao-francisco", nome: "Amparo de São Francisco", x: 55, y: 7 },
  { id: "nossa-senhora-de-lourdes", nome: "Nossa Senhora de Lourdes", x: 43, y: 17 },
  { id: "telha", nome: "Telha", x: 49, y: 19 },
  { id: "santana-do-sao-francisco", nome: "Santana do São Francisco", x: 60, y: 17 },
  { id: "japaratuba", nome: "Japaratuba", x: 62, y: 27 },
  { id: "japoata", nome: "Japoatã", x: 54, y: 25 },
  { id: "pacatuba", nome: "Pacatuba", x: 67, y: 22 },
  { id: "pirambu", nome: "Pirambu", x: 72, y: 30 },
  { id: "sao-francisco", nome: "São Francisco", x: 62, y: 20 },
  { id: "aquidaba", nome: "Aquidabã", x: 42, y: 25 },
  { id: "cumbe", nome: "Cumbe", x: 47, y: 30 },
  { id: "malhada-dos-bois", nome: "Malhada dos Bois", x: 44, y: 23 },
  { id: "muribeca", nome: "Muribeca", x: 49, y: 33 },
  { id: "nossa-senhora-das-dores", nome: "Nossa Senhora das Dores", x: 47, y: 35 },
  { id: "sao-miguel-do-aleixo", nome: "São Miguel do Aleixo", x: 37, y: 30 },
  { id: "areia-branca", nome: "Areia Branca", x: 37, y: 55 },
  { id: "campo-do-brito", nome: "Campo do Brito", x: 42, y: 57 },
  { id: "itabaiana", nome: "Itabaiana", x: 44, y: 50 },
  { id: "macambira", nome: "Macambira", x: 39, y: 60 },
  { id: "malhador", nome: "Malhador", x: 47, y: 55 },
  { id: "moita-bonita", nome: "Moita Bonita", x: 44, y: 45 },
  { id: "sao-domingos", nome: "São Domingos", x: 49, y: 47 },
  { id: "lagarto", nome: "Lagarto", x: 44, y: 64 },
  { id: "riachao-do-dantas", nome: "Riachão do Dantas", x: 49, y: 71 },
  { id: "poco-verde", nome: "Poço Verde", x: 34, y: 69 },
  { id: "simao-dias", nome: "Simão Dias", x: 37, y: 57 },
  { id: "tobias-barreto", nome: "Tobias Barreto", x: 31, y: 76 },
  { id: "capela", nome: "Capela", x: 54, y: 40 },
  { id: "divina-pastora", nome: "Divina Pastora", x: 51, y: 42 },
  { id: "santa-rosa-de-lima", nome: "Santa Rosa de Lima", x: 56, y: 44 },
  { id: "siriri", nome: "Siriri", x: 53, y: 37 },
  { id: "carmopolis", nome: "Carmópolis", x: 61, y: 35 },
  { id: "general-maynard", nome: "General Maynard", x: 58, y: 40 },
  { id: "laranjeiras", nome: "Laranjeiras", x: 55, y: 47 },
  { id: "maruim", nome: "Maruim", x: 58, y: 42 },
  { id: "riachuelo", nome: "Riachuelo", x: 53, y: 50 },
  { id: "rosario-do-catete", nome: "Rosário do Catete", x: 56, y: 50 },
  { id: "santo-amaro-das-brotas", nome: "Santo Amaro das Brotas", x: 61, y: 42 },
  { id: "aracaju", nome: "Aracaju", x: 70, y: 51, capital: true },
  { id: "barra-dos-coqueiros", nome: "Barra dos Coqueiros", x: 73, y: 46 },
  { id: "nossa-senhora-do-socorro", nome: "Nossa Senhora do Socorro", x: 63, y: 51 },
  { id: "sao-cristovao", nome: "São Cristóvão", x: 66, y: 56 },
  { id: "estancia", nome: "Estância", x: 61, y: 70 },
  { id: "indiaroba", nome: "Indiaroba", x: 58, y: 80 },
  { id: "itaporanga-d-ajuda", nome: "Itaporanga d'Ajuda", x: 63, y: 61 },
  { id: "santa-luzia-do-itanhy", nome: "Santa Luzia do Itanhy", x: 55, y: 78 },
  { id: "araua", nome: "Arauá", x: 51, y: 65 },
  { id: "boquim", nome: "Boquim", x: 53, y: 68 },
  { id: "cristinapolis", nome: "Cristinápolis", x: 53, y: 79 },
  { id: "itabaianinha", nome: "Itabaianinha", x: 43, y: 70 },
  { id: "pedrinhas", nome: "Pedrinhas", x: 48, y: 60 },
  { id: "salgado", nome: "Salgado", x: 48, y: 73 },
  { id: "tomar-do-geru", nome: "Tomar do Geru", x: 46, y: 80 },
  { id: "umbauba", nome: "Umbaúba", x: 50, y: 85 },
];

const TOTAL = MUNICIPIOS.length; // 75

// -----------------------------------------------------------------------
// Estado salvo por município: status (não visitado / planejado / visitado)
// + a lista de visitas, cada uma com o lugar específico visitado e a data.
// Isso é o formato que, no futuro, vira um documento no Firestore
// (ex: coleção "municipios/{municipioId}" dentro de "usuarios/{uid}").
// -----------------------------------------------------------------------
type Status = "nao" | "planejado" | "visitado";

type Visita = {
  id: string;
  local: string; // "qual foi o lugar" (praia, cachoeira, centro histórico...)
  data: string; // yyyy-mm-dd
  obs?: string;
};

type MunicipioEstado = {
  status: Status;
  visitas: Visita[];
};

type EstadoApp = Record<string, MunicipioEstado>;

const ESTADO_VAZIO: MunicipioEstado = { status: "nao", visitas: [] };

const STORAGE_KEY = "dito-isso-estado";

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function nameKey(str: string) {
  return normalize(str).replace(/[^a-z]/g, "");
}

function novoId() {
  return `v${Date.now()}${Math.floor(Math.random() * 10000)}`;
}

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

function fmtData(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

const NOME_PARA_ID: Record<string, string> = Object.fromEntries(
  MUNICIPIOS.map((m) => [nameKey(m.nome), m.id])
);

// -----------------------------------------------------------------------
// Malha oficial dos municípios de Sergipe (código IBGE 28), buscada em
// tempo de execução. Fonte: github.com/tbrugz/geodata-br (CC0), derivada
// da malha territorial do IBGE.
// -----------------------------------------------------------------------
const RAW_GEOJSON_URL =
  "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-28-mun.json";

type GeoFeature = {
  type: "Feature";
  properties: { id?: string; name?: string; description?: string };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
};
type GeoCollection = { type: "FeatureCollection"; features: GeoFeature[] };
type MapPath = { id: string | null; nome: string; d: string };

function buildMapPaths(geo: GeoCollection): { paths: MapPath[]; width: number; height: number } {
  let minLon = Infinity,
    maxLon = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eachCoord = (fn: (lon: number, lat: number) => void, coords: any) => {
    if (typeof coords[0] === "number") {
      fn(coords[0], coords[1]);
    } else {
      coords.forEach((c: unknown) => eachCoord(fn, c));
    }
  };

  geo.features.forEach((f) => {
    eachCoord((lon, lat) => {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }, f.geometry.coordinates);
  });

  const targetWidth = 800;
  const scale = targetWidth / (maxLon - minLon);
  const width = targetWidth;
  const height = (maxLat - minLat) * scale;

  const project = (lon: number, lat: number): [number, number] => [
    (lon - minLon) * scale,
    (maxLat - lat) * scale,
  ];

  const ringToPath = (ring: number[][]) =>
    ring
      .map(([lon, lat], i) => {
        const [x, y] = project(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ") + " Z";

  const paths: MapPath[] = geo.features.map((f) => {
    const polygons: number[][][][] =
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates as number[][][]]
        : (f.geometry.coordinates as number[][][][]);

    const d = polygons.map((poly) => poly.map((ring) => ringToPath(ring)).join(" ")).join(" ");
    const nome = f.properties.name || f.properties.description || "";
    return { id: NOME_PARA_ID[nameKey(nome)] ?? null, nome, d };
  });

  return { paths, width, height };
}

// Cores por status (usadas no SVG, na lista/legenda e no "flash" de cor
// do painel quando ele nasce do formato do município no mapa)
const COR: Record<Status, { fill: string; fillHover: string; dot: string; label: string; hex: string }> = {
  nao: {
    fill: "fill-rose-400",
    fillHover: "hover:fill-rose-300",
    dot: "bg-rose-400",
    label: "Ainda não",
    hex: "#fb7185",
  },
  planejado: {
    fill: "fill-amber-400",
    fillHover: "hover:fill-amber-300",
    dot: "bg-amber-400",
    label: "Planejado",
    hex: "#fbbf24",
  },
  visitado: {
    fill: "fill-emerald-500",
    fillHover: "hover:fill-emerald-400",
    dot: "bg-emerald-500",
    label: "Foi",
    hex: "#10b981",
  },
};

type Rect = { left: number; top: number; width: number; height: number };
type PainelState = { id: string; source: Rect; final: Rect };

export default function Home() {
  const [estado, setEstado] = useState<EstadoApp>({});
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);
  // "painel" guarda o município aberto + a caixa (rect) de onde ele foi
  // clicado no mapa e a caixa final do card. "aberto" controla se a
  // transformação está na posição final (true) ou encolhida na posição de
  // origem (false) — é a técnica FLIP: o card sempre existe no tamanho
  // final, e um transform finge que ele está encolhido dentro do pedaço
  // do mapa clicado até a gente soltar a transição.
  const [painel, setPainel] = useState<PainelState | null>(null);
  const [aberto, setAberto] = useState(false);

  // formulário de nova visita (dentro do painel)
  const [novoLocal, setNovoLocal] = useState("");
  const [novaData, setNovaData] = useState(hojeISO());
  const [novaObs, setNovaObs] = useState("");

  // contorno real (IBGE), carregado em tempo de execução
  const [mapPaths, setMapPaths] = useState<MapPath[] | null>(null);
  const [mapSize, setMapSize] = useState<{ width: number; height: number } | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(RAW_GEOJSON_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Falha ao buscar a malha do IBGE");
        return r.json();
      })
      .then((geo: GeoCollection) => {
        if (cancelled) return;
        const { paths, width, height } = buildMapPaths(geo);
        setMapPaths(paths);
        setMapSize({ width, height });
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // TODO(firebase): trocar esse par de useEffect por onSnapshot/getDoc do
  // Firestore assim que a autenticação entrar (ex: doc "usuarios/{uid}").
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setEstado(JSON.parse(raw));
    } catch {
      // segue com estado vazio
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
    } catch {
      // ignora falha de storage
    }
  }, [estado, loaded]);

  function getEstado(id: string): MunicipioEstado {
    return estado[id] ?? ESTADO_VAZIO;
  }

  function setStatus(id: string, status: Status) {
    setEstado((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? ESTADO_VAZIO), status },
    }));
  }

  function adicionarVisita() {
    const id = painel?.id;
    if (!id || !novoLocal.trim()) return;
    const visita: Visita = {
      id: novoId(),
      local: novoLocal.trim(),
      data: novaData || hojeISO(),
      obs: novaObs.trim() || undefined,
    };
    setEstado((prev) => {
      const atual = prev[id] ?? ESTADO_VAZIO;
      return {
        ...prev,
        [id]: {
          status: "visitado",
          visitas: [...atual.visitas, visita],
        },
      };
    });
    setNovoLocal("");
    setNovaData(hojeISO());
    setNovaObs("");
  }

  function removerVisita(municipioId: string, visitaId: string) {
    setEstado((prev) => {
      const atual = prev[municipioId] ?? ESTADO_VAZIO;
      const visitas = atual.visitas.filter((v) => v.id !== visitaId);
      return {
        ...prev,
        [municipioId]: {
          status: visitas.length > 0 ? "visitado" : atual.status === "visitado" ? "nao" : atual.status,
          visitas,
        },
      };
    });
  }

  function resetAll() {
    if (confirm("Apagar todos os registros (status e visitas)?")) {
      setEstado({});
    }
  }

  function abrirPainel(id: string, e?: { currentTarget: { getBoundingClientRect: () => DOMRect } }) {
    if (typeof window === "undefined") return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Caixa real do pedaço do mapa (ou da linha da lista) que foi clicado —
    // é daqui que o card vai "nascer".
    const r = e?.currentTarget.getBoundingClientRect();
    const source: Rect = r
      ? { left: r.left, top: r.top, width: r.width, height: r.height }
      : { left: vw / 2, top: vh / 2, width: 1, height: 1 };

    // Caixa final do card, centralizado na tela.
    const width = Math.min(vw - 32, 448);
    const height = Math.min(vh - 32, vh * 0.85);
    const final: Rect = { left: (vw - width) / 2, top: (vh - height) / 2, width, height };

    setPainel({ id, source, final });
    setAberto(false); // nasce encolhido na caixa de origem...
    setNovoLocal("");
    setNovaData(hojeISO());
    setNovaObs("");
  }

  function fecharPainel() {
    setAberto(false); // ...e encolhe de volta pra lá ao fechar
  }

  // ...e no quadro seguinte, "solta" a transição até a caixa final.
  useEffect(() => {
    if (!painel) return;
    const raf = requestAnimationFrame(() => setAberto(true));
    return () => cancelAnimationFrame(raf);
  }, [painel]);

  const count = useMemo(
    () => MUNICIPIOS.filter((m) => getEstado(m.id).status === "visitado").length,
    [estado]
  );
  const pct = Math.round((count / TOTAL) * 100);

  const listaFiltrada = useMemo(() => {
    const arr = [...MUNICIPIOS].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    if (!search) return arr;
    return arr.filter((m) => normalize(m.nome).includes(normalize(search)));
  }, [search]);

  const municipioSelecionado = painel ? MUNICIPIOS.find((m) => m.id === painel.id) : null;
  const estadoSelecionado = painel ? getEstado(painel.id) : null;

  // Transform que faz o card ir da caixa de origem (encolhido, "dentro" do
  // pedaço do mapa) até a caixa final (aberto = true → identidade).
  let painelTransform = "translate(0px,0px) scale(1,1)";
  if (painel && !aberto) {
    const sx = painel.source.width / painel.final.width;
    const sy = painel.source.height / painel.final.height;
    const dx =
      painel.source.left + painel.source.width / 2 - (painel.final.left + painel.final.width / 2);
    const dy =
      painel.source.top + painel.source.height / 2 - (painel.final.top + painel.final.height / 2);
    painelTransform = `translate(${dx}px,${dy}px) scale(${sx},${sy})`;
  }
  const corPainel = painel ? COR[getEstado(painel.id).status].hex : "#10b981";

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Cabeçalho */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-xl">
              🧭
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-black dark:text-zinc-50">
                DITO ISSO
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Clique num município do mapa pra marcar o status e registrar visitas.
              </p>
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-black/[.08] bg-white p-4 dark:border-white/[.1] dark:bg-zinc-950">
          <div className="whitespace-nowrap text-2xl font-extrabold text-black dark:text-zinc-50">
            {count}
            <span className="text-sm font-semibold text-zinc-400"> /{TOTAL}</span>
          </div>
          <div className="h-2.5 min-w-[160px] flex-1 overflow-hidden rounded-full bg-black/[.08] dark:bg-white/[.1]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="whitespace-nowrap text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {pct}%
          </div>
          <button
            onClick={resetAll}
            className="rounded-lg border border-black/[.08] px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-rose-300 hover:text-rose-500 dark:border-white/[.1] dark:text-zinc-400"
          >
            Zerar tudo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
          {/* Mapa */}
          <div className="relative overflow-hidden rounded-2xl border border-black/[.08] bg-zinc-100 dark:border-white/[.1] dark:bg-zinc-950">
            <div
              className="relative h-[440px] sm:h-[560px]"
              style={{
                background: "radial-gradient(ellipse at 80% 55%, rgba(56,130,190,.16), transparent 55%)",
              }}
            >
              {mapPaths && mapSize ? (
                <svg
                  viewBox={`0 0 ${mapSize.width.toFixed(1)} ${mapSize.height.toFixed(1)}`}
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 h-full w-full"
                >
                  {mapPaths.map((p, i) => {
                    const st = p.id ? getEstado(p.id).status : "nao";
                    const cor = COR[st];
                    return (
                      <path
                        key={p.id ?? `${p.nome}-${i}`}
                        d={p.d}
                        fillRule="evenodd"
                        onClick={(e) => p.id && abrirPainel(p.id, e)}
                        vectorEffect="non-scaling-stroke"
                        className={[
                          p.id ? "cursor-pointer" : "pointer-events-none",
                          "stroke-black/25 transition-colors dark:stroke-black/40",
                          p.id === painel?.id ? "stroke-2 stroke-black/60 dark:stroke-white/70" : "",
                          cor.fill,
                          cor.fillHover,
                        ].join(" ")}
                        strokeWidth={1}
                      >
                        <title>
                          {p.nome} — {COR[st].label}
                        </title>
                      </path>
                    );
                  })}
                </svg>
              ) : (
                <>
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <polygon
                      points="16,6 40,5 50,3 58,4 68,3 78,2 83,9 79,18 75,27 77,35 75,45 77,51 70,59 66,67 62,75 56,85 51,91 44,87 38,81 30,79 24,69 18,59 14,47 10,35 10,23 12,12"
                      className="fill-zinc-200 stroke-black/10 dark:fill-zinc-900 dark:stroke-white/10"
                      strokeWidth="0.6"
                    />
                  </svg>
                  {MUNICIPIOS.map((m) => {
                    const st = getEstado(m.id).status;
                    return (
                      <button
                        key={m.id}
                        onClick={(e) => abrirPainel(m.id, e)}
                        title={`${m.nome} — ${COR[st].label}`}
                        style={{ left: `${m.x}%`, top: `${m.y}%` }}
                        className={[
                          "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-md border border-black/20 shadow transition-transform hover:z-20 hover:scale-125",
                          m.capital ? "h-[18px] w-[18px] rounded-full" : "h-[14px] w-[14px]",
                          COR[st].dot,
                        ].join(" ")}
                      />
                    );
                  })}
                  {!mapError && (
                    <div className="pointer-events-none absolute inset-x-0 top-2 text-center text-[11px] text-zinc-400 dark:text-zinc-600">
                      Carregando contorno oficial do IBGE…
                    </div>
                  )}
                </>
              )}

              <div className="pointer-events-none absolute right-[6%] top-[45%] text-[11px] italic text-zinc-400 dark:text-zinc-600">
                Oceano
                <br />
                Atlântico
              </div>
              <div className="pointer-events-none absolute right-[10%] top-[2%] text-[9px] tracking-[.14em] text-zinc-400 dark:text-zinc-600">
                ALAGOAS
              </div>
              <div className="pointer-events-none absolute left-[2%] top-[46%] text-[9px] tracking-[.14em] text-zinc-400 dark:text-zinc-600">
                BAHIA
              </div>

              {/* Legenda */}
              <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1.5 rounded-lg border border-black/[.08] bg-white/90 px-3 py-2 text-xs text-zinc-500 backdrop-blur dark:border-white/[.1] dark:bg-zinc-900/90 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Foi
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm bg-amber-400" /> Planejado
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm bg-rose-400" /> Ainda não
                </div>
              </div>
            </div>
          </div>

          {/* Busca + lista */}
          <div className="overflow-hidden rounded-2xl border border-black/[.08] bg-white dark:border-white/[.1] dark:bg-zinc-950">
            <div className="border-b border-black/[.08] p-3 dark:border-white/[.1]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar município..."
                className="w-full rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm outline-none dark:border-white/[.1] dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
            <ul className="max-h-[480px] overflow-y-auto p-2">
              {listaFiltrada.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-zinc-400">Nenhum município encontrado.</li>
              )}
              {listaFiltrada.map((m) => {
                const e = getEstado(m.id);
                return (
                  <li
                    key={m.id}
                    onClick={(e) => abrirPainel(m.id, e)}
                    className={[
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-black/[.03] dark:hover:bg-white/[.06]",
                      m.id === painel?.id ? "bg-black/[.04] dark:bg-white/[.08]" : "",
                    ].join(" ")}
                  >
                    <span className={["h-2.5 w-2.5 shrink-0 rounded-full", COR[e.status].dot].join(" ")} />
                    <span className="flex-1 text-sm font-medium text-black dark:text-zinc-50">{m.nome}</span>
                    <span className="text-[11px] text-zinc-400">
                      {COR[e.status].label}
                      {e.visitas.length > 0 ? ` · ${e.visitas.length}x` : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* Painel dinâmico: o próprio pedaço do mapa clicado se estica e   */}
      {/* vira o card, com o formulário aparecendo dentro dele.          */}
      {/* Técnica FLIP: o card fica sempre na posição/tamanho final; um  */}
      {/* transform finge que ele começa encolhido dentro da forma       */}
      {/* clicada, e a gente solta a transição pra ele "abrir".          */}
      {/* ------------------------------------------------------------- */}
      <div
        onClick={fecharPainel}
        className={[
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300",
          painel && aberto ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />
      {painel && (
        <div
          style={{
            position: "fixed",
            left: painel.final.left,
            top: painel.final.top,
            width: painel.final.width,
            height: painel.final.height,
            transform: painelTransform,
            transformOrigin: "center center",
            backgroundColor: aberto ? "transparent" : corPainel,
            borderRadius: aberto ? 16 : 8,
            transition:
              "transform 340ms cubic-bezier(.22,1,.36,1), background-color 340ms ease, border-radius 340ms ease",
            zIndex: 50,
          }}
          onTransitionEnd={() => {
            if (!aberto) setPainel(null);
          }}
          className="overflow-hidden shadow-2xl"
        >
          <div
            style={{ opacity: aberto ? 1 : 0, transition: "opacity 200ms ease 120ms" }}
            className="flex h-full w-full flex-col overflow-y-auto rounded-[inherit] border border-black/[.08] bg-white dark:border-white/[.1] dark:bg-zinc-950"
          >
          {municipioSelecionado && estadoSelecionado && (
            <>
            <div className="flex items-start justify-between gap-3 border-b border-black/[.08] p-5 dark:border-white/[.1]">
              <div>
                <h2 className="text-lg font-extrabold text-black dark:text-zinc-50">
                  {municipioSelecionado.nome}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {estadoSelecionado.visitas.length > 0
                    ? `${estadoSelecionado.visitas.length} visita(s) registrada(s)`
                    : "Nenhuma visita registrada ainda"}
                </p>
              </div>
              <button
                onClick={fecharPainel}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:bg-black/[.05] hover:text-black dark:hover:bg-white/[.08] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-6 p-5">
              {/* Status: foi / ainda não / planejado */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Status
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["nao", "planejado", "visitado"] as Status[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatus(painel!.id, st)}
                      className={[
                        "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                        estadoSelecionado.status === st
                          ? "border-transparent text-white " +
                            (st === "visitado" ? "bg-emerald-500" : st === "planejado" ? "bg-amber-400" : "bg-rose-400")
                          : "border-black/[.1] text-zinc-500 hover:bg-black/[.04] dark:border-white/[.15] dark:text-zinc-400 dark:hover:bg-white/[.06]",
                      ].join(" ")}
                    >
                      {st === "nao" ? "Ainda não" : st === "planejado" ? "Planejado" : "Foi"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nova visita */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Registrar uma visita
                </div>
                <div className="flex flex-col gap-2 rounded-xl border border-black/[.08] p-3 dark:border-white/[.1]">
                  <input
                    value={novoLocal}
                    onChange={(e) => setNovoLocal(e.target.value)}
                    placeholder="Qual foi o lugar? (praia, cachoeira, centro...)"
                    className="w-full rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm outline-none dark:border-white/[.1] dark:bg-zinc-900 dark:text-zinc-100"
                  />
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={novaData}
                      onChange={(e) => setNovaData(e.target.value)}
                      className="w-full rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm outline-none dark:border-white/[.1] dark:bg-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <textarea
                    value={novaObs}
                    onChange={(e) => setNovaObs(e.target.value)}
                    placeholder="Observação (opcional)"
                    rows={2}
                    className="w-full resize-none rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm outline-none dark:border-white/[.1] dark:bg-zinc-900 dark:text-zinc-100"
                  />
                  <button
                    onClick={adicionarVisita}
                    disabled={!novoLocal.trim()}
                    className="mt-1 w-full rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition-opacity hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    + Adicionar visita
                  </button>
                </div>
              </div>

              {/* Lista de visitas */}
              {estadoSelecionado.visitas.length > 0 && (
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Visitas registradas
                  </div>
                  <ul className="flex flex-col gap-2">
                    {[...estadoSelecionado.visitas]
                      .sort((a, b) => (a.data < b.data ? 1 : -1))
                      .map((v) => (
                        <li
                          key={v.id}
                          className="flex items-start justify-between gap-3 rounded-xl border border-black/[.08] p-3 dark:border-white/[.1]"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-black dark:text-zinc-50">
                              {v.local}
                            </div>
                            <div className="text-xs text-zinc-400">{fmtData(v.data)}</div>
                            {v.obs && (
                              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{v.obs}</div>
                            )}
                          </div>
                          <button
                            onClick={() => removerVisita(painel!.id, v.id)}
                            className="shrink-0 text-xs text-zinc-400 hover:text-rose-500"
                            title="Remover visita"
                          >
                            🗑️
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
          </div>
        </div>
      )}
    </div>
  );
}