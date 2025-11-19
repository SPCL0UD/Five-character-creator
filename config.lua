Config = {}

-- General Settings
Config.Debug = true

-- Character Creation
Config.MaxCharacters = 5
Config.EnableDeleteButton = true

-- Camera Settings
Config.Camera = {
    position = vector3(-1450.0, -540.0, 74.0),
    rotation = vector3(0.0, 0.0, 0.0),
    fov = 45.0,
    defaultDistance = 2.5,
    minDistance = 0.5,
    maxDistance = 5.0
}

-- Spawn Points
Config.SpawnPoints = {
    {
        name = "Default Spawn",
        coords = vector4(-1035.0, -2733.0, 20.0, 0.0),
        isDefault = true
    },
    -- Add more spawn points as needed
}

-- Character Customization
Config.Customization = {
    -- Sex
    Sex = {
        {label = "Masculino", value = "mp_m_freemode_01"},
        {label = "Femenino", value = "mp_f_freemode_01"}
    },
    
    -- Parents
    Parents = {
        {label = "Padre", value = "parent1"},
        {label = "Madre", value = "parent2"},
        {label = "Semejanza", value = "resemblance"},
        {label = "Piel", value = "skin"}
    },
    
    -- Face Features
    Features = {
        {label = "Nariz Ancho", value = "nose_width"},
        {label = "Nariz Alto", value = "nose_peak_hight"},
        {label = "Largo Nariz", value = "nose_peak_lenght"},
        {label = "Hueso Nariz", value = "nose_bone_high"},
        {label = "Punta Nariz", value = "nose_peak_lowering"},
        {label = "Hueso Cejas", value = "nose_bone_twist"},
        {label = "Pómulos", value = "eyebrown_high"},
        {label = "Ancho Pómulos", value = "eyebrown_forward"},
        {label = "Mejillas", value = "cheeks_bone_high"},
        {label = "Ancho Mejillas", value = "cheeks_bone_width"},
        {label = "Ojos", value = "cheeks_width"},
        {label = "Labios", value = "lips_thick"},
        {label = "Mandíbula", value = "jaw_bone_width"},
        {label = "Longitud Mandíbula", value = "jaw_bone_back_lenght"},
        {label = "Barbilla", value = "chimp_bone_lowering"},
        {label = "Forma Barbilla", value = "chimp_bone_lenght"},
        {label = "Ancho Barbilla", value = "chimp_bone_width"},
        {label = "Hueco Barbilla", value = "chimp_hole"},
        {label = "Cuello", value = "neck_thick"}
    },
    
    -- Appearance
    Appearance = {
        {label = "Edad", value = "ageing"},
        {label = "Edad Opacidad", value = "ageing_opacity"},
        {label = "Pelo", value = "hair"},
        {label = "Color Pelo", value = "hair_color"},
        {label = "Color Pelo Secundario", value = "hair_highlight"},
        {label = "Maquillaje", value = "makeup"},
        {label = "Opacidad Maquillaje", value = "makeup_opacity"},
        {label = "Color Maquillaje", value = "makeup_color"},
        {label = "Rubor", value = "blush"},
        {label = "Opacidad Rubor", value = "blush_opacity"},
        {label = "Color Rubor", value = "blush_color"},
        {label = "Labios", value = "lipstick"},
        {label = "Opacidad Labios", value = "lipstick_opacity"},
        {label = "Color Labios", value = "lipstick_color"},
        {label = "Pecas", value = "freckles"},
        {label = "Opacidad Pecas", value = "freckles_opacity"},
        {label = "Manchas", value = "complexion"},
        {label = "Opacidad Manchas", value = "complexion_opacity"},
        {label = "Daño Solar", value = "sun_damage"},
        {label = "Opacidad Daño Solar", value = "sun_damage_opacity"}
    },
    
    -- Clothing
    Clothing = {
        {label = "Máscara", value = "mask"},
        {label = "Chaleco", value = "armor"},
        {label = "Camiseta", value = "tshirt"},
        {label = "Torso", value = "torso"},
        {label = "Brazos", value = "arms"},
        {label = "Mochila", value = "bag"},
        {label = "Pantalones", value = "pants"},
        {label = "Zapatos", value = "shoes"},
        {label = "Cadena", value = "chain"},
        {label = "Accesorios Oídos", value = "ears"},
        {label = "Reloj", value = "watch"},
        {label = "Pulsera", value = "bracelet"},
        {label = "Gorra", value = "hat"},
        {label: "Gafas", value: "glasses"}
    },
    
    -- Tattoos
    Tattoos = {
        {zone = "ZONE_HEAD", label = "Cabeza"},
        {zone = "ZONE_LEFT_ARM", label = "Brazo Izquierdo"},
        {zone = "ZONE_RIGHT_ARM", label = "Brazo Derecho"},
        {zone = "ZONE_LEFT_LEG", label = "Pierna Izquierda"},
        {zone = "ZONE_RIGHT_LEG", label = "Pierna Derecha"},
        {zone = "ZONE_TORSO", label = "Torso"}
    }
}

-- Default character appearance
Config.DefaultAppearance = {
    sex = "mp_m_freemode_01",
    face = {
        father = 0,
        mother = 21,
        resemblance = 0.5,
        skinTone = 0.5
    },
    features = {
        noseWidth = 0.0,
        nosePeakHeight = 0.0,
        nosePeakLength = 0.0,
        noseBoneHigh = 0.0,
        nosePeakLowering = 0.0,
        noseBoneTwist = 0.0,
        eyebrowHeight = 0.0,
        eyebrowForward = 0.0,
        cheeksBoneHigh = 0.0,
        cheeksBoneWidth = 0.0,
        cheeksWidth = 0.0,
        lipsThickness = 0.0,
        jawBoneWidth = 0.0,
        jawBoneBackLength = 0.0,
        chimpBoneLowering = 0.0,
        chimpBoneLength = 0.0,
        chimpBoneWidth = 0.0,
        chimpHole = 0.0,
        neckThick = 0.0
    },
    appearance = {
        ageing = 0,
        ageingOpacity = 0.0,
        hair = 0,
        hairColor = 0,
        hairHighlight = 0,
        makeup = 0,
        makeupOpacity = 0.0,
        makeupColor = 0,
        blush = 0,
        blushOpacity = 0.0,
        blushColor = 0,
        lipstick = 0,
        lipstickOpacity = 0.0,
        lipstickColor = 0,
        freckles = 0,
        frecklesOpacity = 0.0,
        complexion = 0,
        complexionOpacity = 0.0,
        sunDamage = 0,
        sunDamageOpacity = 0.0
    },
    clothing = {
        mask = {drawable = 0, texture = 0},
        torso = {drawable = 1, texture = 0},
        tshirt = {drawable = 1, texture = 0},
        arms = {drawable = 1, texture = 0},
        pants = {drawable = 1, texture = 0},
        shoes = {drawable = 1, texture = 0},
        bag = {drawable = 0, texture = 0},
        hat = {drawable = -1, texture = 0},
        glasses = {drawable = -1, texture = 0},
        chain = {drawable = 0, texture = 0},
        ears = {drawable = -1, texture = 0},
        watch = {drawable = -1, texture = 0},
        bracelet = {drawable = -1, texture = 0}
    },
    tattoos = {}
}
