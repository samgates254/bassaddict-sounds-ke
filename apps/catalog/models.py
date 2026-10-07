"""Catalog domain models.

A later phase will add products, categories, brands, product images,
stock status, featured/active flags, a public price, and a separate
customer-specific price that never replaces the public price.

Money will use DecimalField. Currency is KES, displayed as KSh.
Product specifications must be entered by the owner; do not invent them.

Do not add those models in Phase 0.
"""
