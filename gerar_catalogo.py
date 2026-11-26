from pathlib import Path
import json

# Executar este arquivo na pasta principal do projeto.
# Estrutura esperada:
# Beyond_The_Game/
#   gerar_catalogo.py
#   roms/
#     nes/
#     snes/
#     megadrive/

ROOT = Path(__file__).resolve().parent
ROMS_DIR = ROOT / "roms"

EXTENSOES = {
    ".zip", ".7z", ".rar",
    ".nes",
    ".sfc", ".smc", ".fig", ".swc",
    ".md", ".gen", ".bin"
}

CONSOLES = ("nes", "snes", "megadrive")


def nome_exibicao(arquivo: Path) -> str:
    # Remove a extensão para deixar o nome mais limpo no seletor.
    return arquivo.stem


def main():
    catalogo = {}

    for console in CONSOLES:
        pasta = ROMS_DIR / console
        jogos = []

        if not pasta.is_dir():
            print(f"[AVISO] Pasta não encontrada: {pasta}")
            catalogo[console] = jogos
            continue

        for arquivo in sorted(pasta.iterdir(), key=lambda p: p.name.lower()):
            if arquivo.is_file() and arquivo.suffix.lower() in EXTENSOES:
                jogos.append({
                    "name": nome_exibicao(arquivo),
                    "file": arquivo.name
                })

        catalogo[console] = jogos
        print(f"{console}: {len(jogos)} arquivo(s) encontrado(s)")

    destino = ROMS_DIR / "catalog.json"
    ROMS_DIR.mkdir(parents=True, exist_ok=True)

    with destino.open("w", encoding="utf-8") as arquivo_json:
        json.dump(catalogo, arquivo_json, ensure_ascii=False, indent=4)

    total = sum(len(jogos) for jogos in catalogo.values())
    print()
    print(f"Catálogo criado: {destino}")
    print(f"Total: {total} arquivo(s) listado(s)")


if __name__ == "__main__":
    main()
