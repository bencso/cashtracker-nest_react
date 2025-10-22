import api from "@/interceptor/api";
import { addItem, deleteItem, getItems } from "@/libs/inventory";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Product } from "@/constants/product.interface"

type PantryContextType = {
    pantry: Product[];
    loadPantry: any;
    addPantryItem: any;
    deletePantryItem: any;
    isLoading: boolean;
    product: Product | null;
    setProduct: any;
    scanned: boolean;
    setScanned: any;
};

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function PantryProvider({ children }: { children: ReactNode }) {
    const [pantry, setPantry] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [scanned, setScanned] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);

    const loadPantry = async () => {
        try {
            const pantryItems = await getItems();
            setPantry(pantryItems || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const setProductItem = async (code: string) => {
        try {
            const response = await api.get("/product/items/" + code);
            const item = response.data;
            setProduct({
                code: code,
                name: item[0].Product_product_name || "null",
            });
        } catch {
            if (code) setProduct({
                code: code
            })
            else setProduct(null)
        }
        finally {
            setIsLoading(false);
        }
    }

    const addPantryItem = async ({
        code,
        product_name,
        amount,
        expiredAt,
    }: {
        code: string;
        product_name: string;
        amount: number;
        expiredAt: Date;
    }) => {
        try {
            await addItem({
                code,
                product_name,
                amount,
                expiredAt,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setScanned(false);
            loadPantry();
            setIsLoading(false);
        }
    }

    const deletePantryItem = async ({
        id
    }: {
        id: number
    }) => {
        try {
            await deleteItem({
                id
            });
            loadPantry()
        } catch (error) {
            console.error(error);
        } finally {

            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadPantry();
    }, []);

    return (
        <PantryContext.Provider value={{ pantry, loadPantry, isLoading, addPantryItem, deletePantryItem, product, setProduct: setProductItem, scanned, setScanned }}>
            {children}
        </PantryContext.Provider>
    );
}

export function usePantry() {
    const context = useContext(PantryContext);
    if (!context) {
        throw new Error("usePantry must be used within a PantryProvider");
    }
    return context;
}
