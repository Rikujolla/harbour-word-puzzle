Name:       harbour-word-puzzle

Summary:    Word puzzle application
Version:    0.2.1
Release:    1
License:    BSD
URL:        https://github.com/Rikujolla/harbour-word-puzzle
Source0:    %{name}-%{version}.tar.bz2
Requires:   sailfishsilica-qt5 >= 0.10.9
BuildRequires:  pkgconfig(sailfishapp) >= 1.0.2
BuildRequires:  pkgconfig(Qt5Core)
BuildRequires:  pkgconfig(Qt5Qml)
BuildRequires:  pkgconfig(Qt5Quick)
BuildRequires:  desktop-file-utils

%description
In the game words are made by selecting letters with multiple devices
on the same LAN.


%prep
%setup -q -n %{name}-%{version}

%build

%qmake5 

%make_build


%install
%qmake5_install


desktop-file-install --delete-original         --dir %{buildroot}%{_datadir}/applications                %{buildroot}%{_datadir}/applications/*.desktop

%files
%defattr(-,root,root,-)
%{_bindir}/%{name}
%{_datadir}/%{name}
%{_datadir}/applications/%{name}.desktop
%{_datadir}/icons/hicolor/*/apps/%{name}.png
