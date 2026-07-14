---
title: 'ProsteZapisy.pl'
description: 'Aplikacja webowa do zapisów.'
pubDate: '2026-06-30'
heroImage: '/portfolio/prostezapisy.webp'
tags: ['Aplikacja webowa', 'Zapisy online']
link: 'https://prostezapisy.pl/'
---

## Cel projektu

ProsteZapisy.pl powstały jako prosty system dla osób pracujących z klientami na umówione terminy. Celem było stworzenie narzędzia, które pozwala przyjmować rezerwacje online bez własnej strony internetowej, bez kont klientów i bez rozbudowanej konfiguracji.

Użytkownik udostępnia klientom link do swojego kalendarza. Klient wybiera dostępny termin, zostawia potrzebne dane, a osoba przyjmująca zapisy dostaje powiadomienie e-mailem.

## Zakres

- przygotowanie strony produktowej dla aplikacji,
- stworzenie aplikacji frontendowej w Next.js,
- przygotowanie backendu obsługującego zapisy i konta użytkowników,
- publiczny link do kalendarza z dostępnymi terminami,
- formularz rezerwacji bez logowania po stronie klienta,
- powiadomienia e-mail po nowym zapisie,
- prosty panel do konfiguracji terminów i danych.

## Podejście

Projekt został zaprojektowany wokół jednego głównego problemu: przyjmowania zapisów bez dużego systemu i bez konieczności posiadania własnej strony. Dlatego interfejs skupia się na najważniejszych krokach: ustawieniu dostępnych terminów, udostępnieniu linku i odebraniu informacji o nowej rezerwacji.

Next.js został wykorzystany do przygotowania warstwy frontendowej oraz części aplikacyjnej. Po stronie backendu powstała logika odpowiedzialna za użytkowników, terminy, rezerwacje i wysyłkę powiadomień.

## Efekt

Powstała kompletna aplikacja webowa z własną stroną produktową, panelem użytkownika i publicznym widokiem zapisów dla klientów. System pozwala szybko uruchomić prosty terminarz online i zacząć przyjmować zapisy bez dodatkowej infrastruktury po stronie użytkownika.
