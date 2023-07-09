<script>
const apiData = [
 {
        'id': 'e3153d72b6834a5f9ca8cc95ae1e47ee',
        'name': 'env1',
        'profileTemplateId': 'environment',
 
        'namespaces': [
            {
                'created': '2023-01-05T22:37:11.237829',
                'labels': [
                    'label_1',
                    'label_2',
                    'label_3'
                ],
                'memory_bytes': 123456789,
                'millicpus': 100,
                'namespace': 'default_ns_0',
                'status': 'active'
            },
           
        ],
        'pods': [
            {
                'memory_bytes': 12345678,
                'millicpus': 1000,
                'namespace': 'ns_1',
                'node': 'node_1',
                'workload': 'wl1',
                'pod': 'default_pod_0',
                'ready': '2/2',
                'restarts': 0,
                'status': 'active'
            },

        ]
    },
    {
     
        'id': 'e3153d72b6834a5f9ca8cc95ae1e47ee',
        'name': 'env2',
        'profileTemplateId': 'environment',
       
        'namespaces': [
            {
                'created': '2023-01-05T22:37:11.237829',
                'labels': [
                    'label_1',
                    'label_2',
                    'label_3'
                ],
                'memory_bytes': 123456789,
                'millicpus': 100,
                'namespace': 'env_1_ns_0',
                'status': 'active'
            },

        ]
    },
    {
       
        'id': 'e3153d72b6834a5f9ca8cc95ae1e47ee',
        'name': 'env3',
        'profileTemplateId': 'environment',
   
        'namespaces': [
            {
                'created': '2023-01-05T22:37:11.237829',
                'labels': [
                    'label_1',
                    'label_2',
                    'label_3'
                ],
                'memory_bytes': 123456789,
                'millicpus': 100,
                'namespace': 'env_2_ns_0',
                'status': 'active'
            },
 
        ],
        'pods': [
            {
                'memory_bytes': 12345678,
                'millicpus': 1000,
                'namespace': 'ns_1',
                'node': 'node_1',
                'owner': 'owner',
                'pod': 'env_2_pod_0',
                'ready': '2/2',
                'restarts': 0,
                'status': 'active'
            },
           
        ]
    }
];




const categories = apiData.map((item, index) => ({
  id: `0${index + 1}`,
  title: item.name,
}));

console.log("categories" , categories)


const arif = [
  {
    id: 1,
    title: 'Environments',
    category: [
      {
        id: 10,
        title: 'Filter by Creator',
        subCategory: categories,
      },
    ],
  },
  {
    id: 2,
    title: 'Load Generators',
    category: [
      {
        id: 10,
        title: 'Filter by Creator',
        subCategory: categories,
      },
    ],
  },
  {
    id: 3,
    title: 'scenario',
    category: [
      {
        id: 10,
        title: 'Filter by Creator',
        subCategory: categories,
      },
      {
        id: 10,
        title: 'Filter by Test Type',
        subCategory: categories,
      },
    ],
  },
];

function group(id, title, category) {
  return {
    id: id,
    title: title,
    category: category,
  };
}

function subGroup(id, title, subCategory) {
  return {
    id: id,
    title: title,
    subCategory: subCategory,
  };
}

const m = [
group(1, "Environments", [
    subGroup(10, "Filter by Creator", categories),
  ]),
 
  group(2, "Load Generators", [
    subGroup(10, "Filter by Creator", categories),
  ]),
  group(3, "scenario", [
    subGroup(10, "Filter by Creator", categories),
    subGroup(11, "Filter by Test Type", categories),
  ]),
 
]
console.log("m" , m)

console.log("arif" , arif)




/*
interface Category {
  id: number;
  title: string;
  subCategory?: string[];
}

interface Arif {
  id: number;
  title: string;
  category: Category[];
}

function generateArif(id: number, title: string, category: Category[]): Arif {
  return {
    id: id,
    title: title,
    category: category,
  };
}

function generateCategory(id: number, title: string, subCategory?: string[]): Category {
  return {
    id: id,
    title: title,
    subCategory: subCategory,
  };
}

// example usage of the functions to generate the arif array dynamically
const arif: Arif[] = [
  generateArif(1, "Environments", [
    generateCategory(10, "Filter by Creator", ["category1", "category2"]),
  ]),
  generateArif(2, "Load Generators", [
    generateCategory(10, "Filter by Creator", ["category1", "category2"]),
  ]),
  generateArif(3, "scenario", [
    generateCategory(10, "Filter by Creator", ["category1", "category2"]),
    generateCategory(11, "Filter by Test Type", ["type1", "type2"]),
  ]),
];


*/
</script>
