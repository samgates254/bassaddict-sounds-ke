"""Idempotent catalog, category, and service seed command.

Safe to run repeatedly in both development and production.
Preserves existing business-managed fields (prices, stock, descriptions)
unless explicitly called with --overwrite.
"""

from decimal import Decimal
from django.core.management.base import BaseCommand
from django.db import transaction

from apps.catalog.models import Category, Product, PriceType, StockStatus
from apps.services.models import Service
from apps.core.models import BusinessSettings


class Command(BaseCommand):
    help = "Seed or update verified catalog categories, products, and services idempotently."

    def add_arguments(self, parser):
        parser.add_argument(
            "--overwrite",
            action="store_true",
            help="Force overwrite existing business-managed fields with fixture defaults.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        overwrite = options.get("overwrite", False)
        mode_desc = "OVERWRITE" if overwrite else "PRESERVE EXISTING (SAFE)"
        self.stdout.write(f"Seeding catalog [Mode: {mode_desc}]...")

        self.stdout.write("Processing categories...")
        categories_data = [
            {
                "slug": "speakers",
                "name": "Speakers & Coaxials",
                "description": "High-fidelity 2-way, 3-way, and component speaker systems.",
                "sort_order": 1,
            },
            {
                "slug": "subwoofers",
                "name": "Subwoofers & Bass",
                "description": "Deep, punchy bass subwoofers and active underseat enclosures.",
                "sort_order": 2,
            },
            {
                "slug": "amplifiers",
                "name": "Power Amplifiers",
                "description": "Class-D mono and multi-channel high power car audio amplifiers.",
                "sort_order": 3,
            },
            {
                "slug": "monitors",
                "name": "Displays & Head Units",
                "description": "High-resolution in-dash TFT/LED touchscreen displays and monitors.",
                "sort_order": 4,
            },
        ]

        cats_by_slug = {}
        for cdata in categories_data:
            cat = Category.objects.filter(slug=cdata["slug"]).first()
            if cat:
                if overwrite:
                    cat.name = cdata["name"]
                    cat.description = cdata["description"]
                    cat.sort_order = cdata["sort_order"]
                    cat.active = True
                    cat.save()
                    self.stdout.write(f"  Overwrote category: {cat.name}")
                else:
                    self.stdout.write(f"  Preserved existing category: {cat.name}")
            else:
                cat = Category.objects.create(
                    slug=cdata["slug"],
                    name=cdata["name"],
                    description=cdata["description"],
                    sort_order=cdata["sort_order"],
                    active=True,
                )
                self.stdout.write(f"  Created category: {cat.name}")
            cats_by_slug[cat.slug] = cat

        self.stdout.write("Processing showroom products...")
        products_data = [
            {
                "slug": "pioneer-ts-6900pro",
                "name": "Pioneer TS-6900PRO High Efficiency Speaker",
                "brand": "Pioneer",
                "model_number": "TS-6900PRO",
                "category": cats_by_slug["speakers"],
                "description": "Pioneer TS-6900PRO 6x9-inch 2-Way Coaxial Speaker. Designed for serious sound pressure levels with high sensitivity and crystal clear highs.",
                "specifications": {
                    "Size": "6x9 inch",
                    "Max Power": "600W",
                    "RMS Power": "100W",
                    "Sensitivity": "92 dB",
                    "Frequency Response": "29 Hz - 40 kHz",
                },
                "public_price": Decimal("14500.00"),
                "price_type": PriceType.FIXED,
                "stock_status": StockStatus.IN_STOCK,
                "featured": True,
            },
            {
                "slug": "pioneer-ts-z65f",
                "name": "Pioneer TS-Z65F 2-Way Hi-Res Speaker",
                "brand": "Pioneer",
                "model_number": "TS-Z65F",
                "category": cats_by_slug["speakers"],
                "description": "Pioneer TS-Z65F Hi-Res Audio 6.5-inch 2-Way Coaxial Speaker. Audiophile-grade precision, Twaron cone, and smooth open-staging sound reproduction.",
                "specifications": {
                    "Size": "6.5 inch",
                    "Audio": "Hi-Res Certified",
                    "Max Power": "330W",
                    "RMS Power": "110W",
                    "Frequency Response": "32 Hz - 96 kHz",
                },
                "public_price": Decimal("28000.00"),
                "price_type": PriceType.FIXED,
                "stock_status": StockStatus.IN_STOCK,
                "featured": True,
            },
            {
                "slug": "kuerl-subwoofer",
                "name": "KUERL 10-Inch High Performance Active Subwoofer",
                "brand": "KUERL",
                "model_number": "K-1008APR",
                "category": cats_by_slug["subwoofers"],
                "description": "KUERL 10-inch Underseat Active Subwoofer with built-in high-output amplifier. Fits under vehicle seats or compact boot spaces for tight, clean low-end punch.",
                "specifications": {
                    "Woofer": "10 inch 4 Ohm",
                    "RMS Power": "150W RMS",
                    "Max Power": "600W",
                    "Voltage": "DC 12V",
                    "Controls": "Remote Bass Level, LPF, Gain",
                },
                "public_price": Decimal("16500.00"),
                "price_type": PriceType.FIXED,
                "stock_status": StockStatus.IN_STOCK,
                "featured": True,
            },
            {
                "slug": "monitor-9-inch",
                "name": "9-Inch TFT/LED Hi-Res Display Monitor",
                "brand": "Bassaddict Audio",
                "model_number": "TM-900HD",
                "category": cats_by_slug["monitors"],
                "description": "9-inch TFT/LED High-Resolution In-Car Display Monitor. Multi-source video inputs for reverse cameras, media players, and headrest installations.",
                "specifications": {
                    "Display": "9-inch LED Backlit",
                    "Resolution": "1024 x 600",
                    "Inputs": "Dual AV Video",
                    "Mount": "Dashboard Stand & Headrest Shroud",
                },
                "public_price": Decimal("12500.00"),
                "price_type": PriceType.FIXED,
                "stock_status": StockStatus.IN_STOCK,
                "featured": False,
            },
            {
                "slug": "monitor-7-inch",
                "name": "7-Inch TFT/LED Hi-Res Display Monitor",
                "brand": "Bassaddict Audio",
                "model_number": "TM-700HD",
                "category": cats_by_slug["monitors"],
                "description": "7-inch TFT/LED High-Resolution Display Monitor with headrest shroud and stand. Crisp display for reverse parking view and passenger entertainment.",
                "specifications": {
                    "Display": "7-inch LED Backlit",
                    "Resolution": "800 x 480",
                    "Inputs": "AV Video + Reverse Trigger",
                    "Mount": "Headrest Shroud & Stand",
                },
                "public_price": Decimal("8500.00"),
                "price_type": PriceType.FIXED,
                "stock_status": StockStatus.IN_STOCK,
                "featured": False,
            },
        ]

        for pdata in products_data:
            prod = Product.objects.filter(slug=pdata["slug"]).first()
            if prod:
                if overwrite:
                    prod.name = pdata["name"]
                    prod.brand = pdata["brand"]
                    prod.model_number = pdata["model_number"]
                    prod.category = pdata["category"]
                    prod.description = pdata["description"]
                    prod.specifications = pdata["specifications"]
                    prod.public_price = pdata["public_price"]
                    prod.price_type = pdata["price_type"]
                    prod.stock_status = pdata["stock_status"]
                    prod.featured = pdata["featured"]
                    prod.active = True
                    prod.save()
                    self.stdout.write(f"  Overwrote product: {prod.name}")
                else:
                    self.stdout.write(f"  Preserved existing product: {prod.name}")
            else:
                prod = Product.objects.create(
                    slug=pdata["slug"],
                    name=pdata["name"],
                    brand=pdata["brand"],
                    model_number=pdata["model_number"],
                    category=pdata["category"],
                    description=pdata["description"],
                    specifications=pdata["specifications"],
                    public_price=pdata["public_price"],
                    price_type=pdata["price_type"],
                    stock_status=pdata["stock_status"],
                    featured=pdata["featured"],
                    active=True,
                )
                self.stdout.write(f"  Created product: {prod.name}")

        self.stdout.write("Processing workshop services...")
        services_data = [
            {
                "slug": "car-audio-installation",
                "name": "Car Audio Installation",
                "description": "Professional wiring, sound insulation, and clean fitting of speakers, subwoofers, and amplifiers.",
                "featured": True,
                "sort_order": 1,
            },
            {
                "slug": "custom-subwoofer-enclosures",
                "name": "Custom Subwoofer Enclosures",
                "description": "Custom MDF and fiberglass ported or sealed boxes calculated for your car boot and sub specs.",
                "featured": True,
                "sort_order": 2,
            },
            {
                "slug": "soundproofing-damping",
                "name": "Soundproofing & Sound Deadening",
                "description": "Multi-layer butyl rubber and acoustic foam installation to eliminate rattles and road noise.",
                "featured": True,
                "sort_order": 3,
            },
            {
                "slug": "multimedia-reverse-camera",
                "name": "Multimedia & Reverse Camera Fitting",
                "description": "Android touchscreens, headrest monitors, and HD night-vision reverse cameras.",
                "featured": True,
                "sort_order": 4,
            },
            {
                "slug": "dsp-tuning-diagnostics",
                "name": "DSP Audio Tuning & Diagnostics",
                "description": "Digital signal processor setup, time alignment, active crossovers, and parametric EQ calibration.",
                "featured": True,
                "sort_order": 5,
            },
        ]

        for sdata in services_data:
            srv = Service.objects.filter(slug=sdata["slug"]).first()
            if srv:
                if overwrite:
                    srv.name = sdata["name"]
                    srv.description = sdata["description"]
                    srv.featured = sdata["featured"]
                    srv.sort_order = sdata["sort_order"]
                    srv.active = True
                    srv.save()
                    self.stdout.write(f"  Overwrote service: {srv.name}")
                else:
                    self.stdout.write(f"  Preserved existing service: {srv.name}")
            else:
                srv = Service.objects.create(
                    slug=sdata["slug"],
                    name=sdata["name"],
                    description=sdata["description"],
                    featured=sdata["featured"],
                    sort_order=sdata["sort_order"],
                    active=True,
                )
                self.stdout.write(f"  Created service: {srv.name}")

        BusinessSettings.load()
        self.stdout.write(self.style.SUCCESS("Catalog seed completed successfully!"))
