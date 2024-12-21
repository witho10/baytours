-- Create members table
CREATE TABLE members (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    join_year INTEGER NOT NULL,
    tour_count INTEGER DEFAULT 0,
    status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active'
);

-- Create marketing_categories table
CREATE TABLE marketing_categories (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    material_count INTEGER DEFAULT 0
);

-- Create category_tags table
CREATE TABLE category_tags (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    category_id BIGINT REFERENCES marketing_categories(id) ON DELETE CASCADE,
    tag TEXT NOT NULL
);

-- Create indexes
CREATE INDEX idx_members_join_year ON members(join_year);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_category_tags_category_id ON category_tags(category_id);

-- Insert sample data
INSERT INTO members (name, join_year, tour_count, status) VALUES
    ('John Doe', 2023, 5, 'active'),
    ('Jane Smith', 2023, 3, 'active'),
    ('Bob Wilson', 2022, 8, 'active'),
    ('Alice Brown', 2022, 2, 'inactive');

INSERT INTO marketing_categories (name, description, material_count) VALUES
    ('Adventure Tours', 'Exciting and challenging outdoor experiences', 24),
    ('Cultural Tours', 'Immersive cultural experiences and heritage sites', 18),
    ('Luxury Packages', 'Premium travel experiences with exclusive amenities', 12);

INSERT INTO category_tags (category_id, tag) VALUES
    (1, 'Outdoor'),
    (1, 'Adventure'),
    (1, 'Extreme'),
    (2, 'Culture'),
    (2, 'History'),
    (2, 'Arts'),
    (3, 'Luxury'),
    (3, 'Premium'),
    (3, 'Exclusive'); 