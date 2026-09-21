// ==========================================
// 1. GESTION DU THÈME (Sombre / Clair / Système)
// ==========================================

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    let resolved = theme;
    if (theme === 'system') {
        resolved = getSystemTheme();
    }
    document.documentElement.setAttribute('data-theme', resolved);
}

function setTheme(theme) {
    localStorage.setItem('technophile_theme', theme);
    applyTheme(theme);
}

// Écouter les changements du système si le mode "Système" est actif
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const savedTheme = localStorage.getItem('technophile_theme');
    if (savedTheme === 'system') {
        applyTheme('system');
    }
});

// ==========================================
// 2. GESTION DE LA LANGUE
// ==========================================

const translations = {
    fr: {
        'nav.dashboard': 'Tableau de bord',
        'nav.database': 'Base de données',
        'nav.sql': 'Éditeur SQL',
        'nav.auth': 'Authentification',
        'nav.profile': 'Profil',
        'nav.settings': 'Paramètres',
        'search.placeholder': 'Recherche...',
        'breadcrumb.settings': 'Paramètres',
        'settings.title': 'Paramètres',
        'settings.subtitle': 'Gérez vos préférences et les paramètres de votre compte.',
        'settings.appearance': 'Apparence',
        'settings.theme': 'Thème de l\'interface',
        'settings.theme.desc': 'Choisissez entre le mode clair et le mode sombre.',
        'settings.theme.dark': 'Sombre (Par défaut)',
        'settings.theme.light': 'Clair',
        'settings.theme.system': 'Système',
        'settings.language': 'Langue',
        'settings.language.desc': 'La langue d\'affichage de l\'application.',
        'settings.notifications': 'Notifications',
        'settings.notif.email': 'Alertes par email',
        'settings.notif.email.desc': 'Recevez un email lorsqu\'un projet est mis à jour.',
        'settings.notif.push': 'Notifications push',
        'settings.notif.push.desc': 'Recevez des notifications dans votre navigateur.',
        'settings.security': 'Sécurité',
        'settings.password': 'Mot de passe',
        'settings.password.desc': 'Dernière modification il y a 3 mois',
        'settings.password.btn': 'Modifier',
        'settings.2fa': 'Authentification à deux facteurs (2FA)',
        'settings.2fa.desc': 'Ajoutez une couche de sécurité supplémentaire à votre compte.',
        'settings.2fa.btn': 'Activer',
        'settings.danger': 'Zone de danger',
        'settings.delete': 'Supprimer le compte',
        'settings.delete.desc': 'Une fois supprimé, toutes vos données seront définitivement effacées.',
        'settings.delete.btn': 'Supprimer',
        'settings.cancel': 'Annuler',
        'settings.save': 'Enregistrer les paramètres',
        'projects.subtitle': 'Tous tes projets, stockés en local sur cette machine.',
        'projects.all_levels': 'Tous les niveaux',
        'projects.new': 'Nouveau projet',
        'projects.new_btn': '+ Nouveau projet',
        'projects.field.title': 'Titre',
        'projects.field.desc': 'Description',
        'projects.field.level': 'Niveau',
        'projects.cancel': 'Annuler',
        'projects.create': 'Créer',
        'page.stats': 'Statistiques',
        'stats.subtitle': 'Calculées à partir de tes projets enregistrés.',
        'stats.by_level': 'Répartition par niveau',
        'stats.recent': 'Projets récents',
        'page.database': 'Base de données',
        'db.col.key': 'Clé',
        'db.col.type': 'Type',
        'db.col.value': 'Valeur',
        'db.reset': 'Réinitialiser tout'
    },
    en: {
        'nav.dashboard': 'Dashboard',
        'nav.database': 'Database',
        'nav.sql': 'SQL Editor',
        'nav.auth': 'Authentication',
        'nav.profile': 'Profile',
        'nav.settings': 'Settings',
        'search.placeholder': 'Search...',
        'breadcrumb.settings': 'Settings',
        'settings.title': 'Settings',
        'settings.subtitle': 'Manage your preferences and account settings.',
        'settings.appearance': 'Appearance',
        'settings.theme': 'Interface theme',
        'settings.theme.desc': 'Choose between light and dark mode.',
        'settings.theme.dark': 'Dark (Default)',
        'settings.theme.light': 'Light',
        'settings.theme.system': 'System',
        'settings.language': 'Language',
        'settings.language.desc': 'The display language of the application.',
        'settings.notifications': 'Notifications',
        'settings.notif.email': 'Email alerts',
        'settings.notif.email.desc': 'Get an email when a project is updated.',
        'settings.notif.push': 'Push notifications',
        'settings.notif.push.desc': 'Get notifications in your browser.',
        'settings.security': 'Security',
        'settings.password': 'Password',
        'settings.password.desc': 'Last changed 3 months ago',
        'settings.password.btn': 'Change',
        'settings.2fa': 'Two-factor authentication (2FA)',
        'settings.2fa.desc': 'Add an extra layer of security to your account.',
        'settings.2fa.btn': 'Enable',
        'settings.danger': 'Danger zone',
        'settings.delete': 'Delete account',
        'settings.delete.desc': 'Once deleted, all your data will be permanently erased.',
        'settings.delete.btn': 'Delete',
        'settings.cancel': 'Cancel',
        'settings.save': 'Save settings',
        'projects.subtitle': 'All your projects, stored locally on this machine.',
        'projects.all_levels': 'All levels',
        'projects.new': 'New project',
        'projects.new_btn': '+ New project',
        'projects.field.title': 'Title',
        'projects.field.desc': 'Description',
        'projects.field.level': 'Level',
        'projects.cancel': 'Cancel',
        'projects.create': 'Create',
        'page.stats': 'Statistics',
        'stats.subtitle': 'Computed from your saved projects.',
        'stats.by_level': 'Breakdown by level',
        'stats.recent': 'Recent projects',
        'page.database': 'Database',
        'db.col.key': 'Key',
        'db.col.type': 'Type',
        'db.col.value': 'Value',
        'db.reset': 'Reset all'
    },
    es: {
        'nav.dashboard': 'Panel',
        'nav.database': 'Base de datos',
        'nav.sql': 'Editor SQL',
        'nav.auth': 'Autenticación',
        'nav.profile': 'Perfil',
        'nav.settings': 'Ajustes',
        'search.placeholder': 'Buscar...',
        'breadcrumb.settings': 'Ajustes',
        'settings.title': 'Ajustes',
        'settings.subtitle': 'Administra tus preferencias y ajustes de cuenta.',
        'settings.appearance': 'Apariencia',
        'settings.theme': 'Tema de la interfaz',
        'settings.theme.desc': 'Elige entre modo claro y oscuro.',
        'settings.theme.dark': 'Oscuro (Por defecto)',
        'settings.theme.light': 'Claro',
        'settings.theme.system': 'Sistema',
        'settings.language': 'Idioma',
        'settings.language.desc': 'El idioma de visualización de la aplicación.',
        'settings.notifications': 'Notificaciones',
        'settings.notif.email': 'Alertas por correo',
        'settings.notif.email.desc': 'Recibe un correo cuando se actualice un proyecto.',
        'settings.notif.push': 'Notificaciones push',
        'settings.notif.push.desc': 'Recibe notificaciones en tu navegador.',
        'settings.security': 'Seguridad',
        'settings.password': 'Contraseña',
        'settings.password.desc': 'Último cambio hace 3 meses',
        'settings.password.btn': 'Cambiar',
        'settings.2fa': 'Autenticación de dos factores (2FA)',
        'settings.2fa.desc': 'Añade una capa extra de seguridad a tu cuenta.',
        'settings.2fa.btn': 'Activar',
        'settings.danger': 'Zona de peligro',
        'settings.delete': 'Eliminar cuenta',
        'settings.delete.desc': 'Una vez eliminada, todos tus datos se borrarán permanentemente.',
        'settings.delete.btn': 'Eliminar',
        'settings.cancel': 'Cancelar',
        'settings.save': 'Guardar ajustes',
        'projects.subtitle': 'Todos tus proyectos, guardados localmente en esta máquina.',
        'projects.all_levels': 'Todos los niveles',
        'projects.new': 'Nuevo proyecto',
        'projects.new_btn': '+ Nuevo proyecto',
        'projects.field.title': 'Título',
        'projects.field.desc': 'Descripción',
        'projects.field.level': 'Nivel',
        'projects.cancel': 'Cancelar',
        'projects.create': 'Crear',
        'page.stats': 'Estadísticas',
        'stats.subtitle': 'Calculadas a partir de tus proyectos guardados.',
        'stats.by_level': 'Distribución por nivel',
        'stats.recent': 'Proyectos recientes',
        'page.database': 'Base de datos',
        'db.col.key': 'Clave',
        'db.col.type': 'Tipo',
        'db.col.value': 'Valor',
        'db.reset': 'Restablecer todo'
    }
};



/* ==== EXTENSIONS i18n (ajouts progressifs) ==== */
Object.assign(translations.fr, {
  'topbar.back': 'Retour',
  'page.projects': 'Projets',
  'toolbar.status.all': 'Statut (tous)',
  'toolbar.level.beginner': 'Niveau débutant',
  'toolbar.level.intermediate': 'Niveau intermédiaire',
  'toolbar.level.advanced': 'Niveau avancé',
  'usage.title': 'Utilisation du forfait gratuit',
  'usage.cycle': 'Cycle de facturation actuel',
  'usage.upgrade': 'Passez à la version Pro',
});
Object.assign(translations.en, {
  'topbar.back': 'Back',
  'page.projects': 'Projects',
  'toolbar.status.all': 'Status (all)',
  'toolbar.level.beginner': 'Beginner level',
  'toolbar.level.intermediate': 'Intermediate level',
  'toolbar.level.advanced': 'Advanced level',
  'usage.title': 'Free plan usage',
  'usage.cycle': 'Current billing cycle',
  'usage.upgrade': 'Upgrade to Pro',
});
Object.assign(translations.es, {
  'topbar.back': 'Volver',
  'page.projects': 'Proyectos',
  'toolbar.status.all': 'Estado (todos)',
  'toolbar.level.beginner': 'Nivel principiante',
  'toolbar.level.intermediate': 'Nivel intermedio',
  'toolbar.level.advanced': 'Nivel avanzado',
  'usage.title': 'Uso del plan gratuito',
  'usage.cycle': 'Ciclo de facturación actual',
  'usage.upgrade': 'Pasar a Pro',
});
/* ==== /EXTENSIONS i18n ==== */

function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    const dict = translations[lang] || translations.fr;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });
}

function setLanguage(lang) {
    localStorage.setItem('technophile_lang', lang);
    applyLanguage(lang);
}

// ==========================================
// 3. INITIALISATION AU CHARGEMENT
// ==========================================
(function init() {
    // Thème
    const savedTheme = localStorage.getItem('technophile_theme') || 'dark';
    applyTheme(savedTheme);
    
    // Langue
    const savedLang = localStorage.getItem('technophile_lang') || 'fr';
    applyLanguage(savedLang);
})();

// ==========================================
// 4. TOAST GLOBAL (utilisé partout)
// ==========================================
function showToast(message) {
    let toast = document.getElementById('technophile-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'technophile-toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ==========================================
// 5. SYNC AVATAR GLOBAL
// ==========================================
function syncAvatar() {
    try {
        const user = JSON.parse(localStorage.getItem('technophile_user') || 'null');
        if (!user || !user.avatar) return;

        document.querySelectorAll('.avatar').forEach(el => {
            el.textContent = user.avatar.animal;
            el.style.background = user.avatar.gradient;
            el.style.fontSize = '14px';
        });
    } catch (e) {
        console.warn('avatar sync:', e);
    }
}

document.addEventListener('DOMContentLoaded', syncAvatar);
