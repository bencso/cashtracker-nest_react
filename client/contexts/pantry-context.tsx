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
    setProductItemByCode: any;
    setProductItemByKeyword: any;
    scanned: boolean;
    setScanned: any;
    setProduct: any;
};

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function PantryProvider({ children }: { children: ReactNode }) {
    const [pantry, setPantry] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [scanned, setScanned] = useState<boolean>(false);
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

    const setProductItemByCode = async (code: string) => {
        try {
            const response = await api.get("/product/items/code/" + code);
            const item = response.data;
            if (!item.code && !item.product_name) throw new Error("Nincs ilyen termék");
            setProduct({
                code: item.code,
                name: item.product_name ? item.product_name : null,
            });
        } catch {
            if (code) setProduct({
                code: code,
                name: null
            })
            else setProduct(null)
        }
        finally {
            setIsLoading(false);
        }
    }

    const setProductItemByKeyword = async (keyword: string) => {
        try {
            const response = await api.get("/product/items/keyword/" + keyword);
            const item = response.data;
            setProduct({
                code: item.code || null,
                name: item.product_name || null,
            });
        } catch {
            if (keyword) setProduct({
                name: keyword,
                code: null
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
        <PantryContext.Provider value={{ pantry, loadPantry, isLoading, addPantryItem, deletePantryItem, product, setProductItemByCode, setProductItemByKeyword, scanned, setScanned, setProduct }}>
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
