export default function () {
  return [{
    title: 'Dashboard',
    to: {
      name: 'dashboard',
    },
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: '',
  }, {
    title: 'Report',
    htmlBefore: '<i class="material-icons">report_problem</i>',
    to: {
      name: 'video',
    },
  }, {
    title: 'Issue Tracker',
    htmlBefore: '<i class="material-icons">vertical_split</i>',
    to: {
      name: 'issue-tracker',
    },
  }, {
    title: 'Marketplace',
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: {
      name: 'marketplace',
    },
  }, {
    title: 'Your Orders',
    htmlBefore: '<i class="material-icons">view_module</i>',
    to: {
      name: 'your-orders',
    },
  }, {
    title: 'Settings',
    htmlBefore: '<i class="material-icons">table_chart</i>',
    to: {
      name: 'settings',
    },
  }];
}
