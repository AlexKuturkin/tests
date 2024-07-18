import { Component, OnInit } from "@angular/core";
import { ImportsModule } from "./imports";
import { CountryService } from "@service/countryservice";
import { FormControl, FormGroup } from "@angular/forms";
import { MenuItem } from "primeng/api";
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

@Component({
  selector: "autocomplete-reactive-forms-demo",
  templateUrl: "./autocomplete-reactive-forms-demo.html",
  standalone: true,
  imports: [ImportsModule],
  providers: [CountryService],
})
export class AutocompleteReactiveFormsDemo implements OnInit {
  /* auto */
  countries: any[] | undefined;
  formGroup: FormGroup | undefined;
  filteredCountries: any[] | undefined;

  /* context menu */
  items: MenuItem[] | undefined;
  cm?: any;
  selectedId?: string;
  selectedName?: string;
  data: Product[] = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      id: "1003",
      code: "244wgerg2",
      name: "Blue T-Shirt",
      description: "Product Description",
      image: "blue-t-shirt.jpg",
      price: 29,
      category: "Clothing",
      quantity: 25,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1004",
      code: "h456wer53",
      name: "Bracelet",
      description: "Product Description",
      image: "bracelet.jpg",
      price: 15,
      category: "Accessories",
      quantity: 73,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
  ];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    /* auto */
    this.countryService.getCountries().then((countries) => {
      this.countries = countries;
    });
    this.formGroup = new FormGroup({
      selectedCountry: new FormControl<object | null>(null),
    });

    /* context menu */
    this.items = [
      {
        label: "Favorite",
        icon: "pi pi-star",
        shortcut: "⌘+D",
      },
      {
        label: "Add",
        icon: "pi pi-shopping-cart",
        shortcut: "⌘+A",
      },
      {
        separator: true,
      },
      {
        label: "Share",
        icon: "pi pi-share-alt",
        items: [
          {
            label: "Whatsapp",
            icon: "pi pi-whatsapp",
            badge: "2",
          },
          {
            label: "Instagram",
            icon: "pi pi-instagram",
            badge: "3",
          },
        ],
      },
    ];
  }

  /* auto */
  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query) == -1) {
        filtered.push(country);
      }
    }
    this.filteredCountries = filtered;
  }

  /* context menu */
  onContextMenu(event, product: Product) {
    const array = [];
    array.push(product);
    this.cm.target = event.currentTarget;
    this.cm.show(event);
  }
  onHide() {
    this.selectedId = "";
    this.selectedName = "";
  }
}
