# Projekt Sudoku na lekcje Svelte

Ten projekt jest wykonany na potrzebę lekcji Aplikacji internetowch, wykonany w technologii svelte + vite

## Uruchamianie projektu

Aby uruchomić projekt należy użyć komendy
```node
npm run dev
```
która uruchomi projekt na wolnym porcie localhosta. Po uruchomieniu i wejściu na strone należy wgrać na strone plik z sudoku (przykładowe pliki są załączone w folderze ./public/)

## Załączone pliki sudoku

W folderze **./public/** załączyłem 4 pliki sudoku 3 niepoprawne i jeden poprawny. Nazwy odzwierciedlają rodzaj niepoprawnej zmiany w pliku. Format pliku to tablica składająca się z 9 tablic, każda posiadająca 9 obiektów o następującej strukturze:
```ts
{
    num: number,
    ans: number,
    hints: number[],
    immut?: boolean
}
```
w której **num** przedstawia numer wpisany, **ans** poprawną odpowiedź dla danego pola, **hints** tablice podpowiedzi wpisanych przez urzytkownika, oraz opcjonalne **immut** odpowiadające za zdolność urzytkownika do edycji pola na stronie

## Respozytorium

Wszystkie pliki projektu są zamieszczone na stronie [https://github.com/janSochaOfficial/svelte-sudoku](github)