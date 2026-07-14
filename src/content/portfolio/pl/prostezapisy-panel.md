---
title: 'Panel administracyjny ProsteZapisy'
description: 'Panel administracyjny zapisów.'
pubDate: '2026-07-13'
heroImage: '/portfolio/prostezapisy-panel.webp'
tags: ['Panel administracyjny', 'React']
---

## Cel projektu

Panel administracyjny powstał jako część systemu ProsteZapisy. Jego zadaniem jest umożliwienie użytkownikowi zarządzania kalendarzem, dostępnością i ustawieniami bez potrzeby obsługi rozbudowanego narzędzia.

To wewnętrzna część aplikacji, dlatego nie prowadzi do publicznej strony ani widoku dostępnego dla odwiedzających. Użytkownik korzysta z niej po zalogowaniu, żeby przygotować terminy, które później mogą zobaczyć klienci w publicznym linku do zapisów.

## Zakres

- przygotowanie panelu administracyjnego w React,
- widok kalendarza z tygodniowym układem terminów,
- boczna nawigacja z mini kalendarzem,
- zarządzanie dostępnością i blokami czasu,
- sekcja ustawień użytkownika,
- integracja z tym samym backendem, który obsługuje publiczne zapisy.

## Podejście

Panel został zaprojektowany tak, żeby najważniejszy element systemu — kalendarz — był od razu widoczny po wejściu do aplikacji. Lewy pasek pełni funkcję szybkiej nawigacji, a główna część ekranu skupia się na terminach i dostępności.

React został wykorzystany do stworzenia interaktywnego interfejsu panelu. Dane, terminy i ustawienia są obsługiwane przez ten sam backend, który działa pod publiczną częścią ProsteZapisy.

## Efekt

Powstał prywatny panel do obsługi systemu zapisów, który uzupełnia publiczną stronę produktową i widok rezerwacji dla klientów. Dzięki temu ProsteZapisy działa jako kompletna aplikacja: użytkownik zarządza terminami w panelu, a klient zapisuje się przez prosty publiczny link.
